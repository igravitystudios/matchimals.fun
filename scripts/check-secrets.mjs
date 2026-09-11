#!/usr/bin/env bun
// Refuses to push commits that add secrets to this public repo. Runs from
// scripts/git-hooks/pre-push (enable once per clone with
// `git config core.hooksPath scripts/git-hooks`), which hands it git's
// "<local ref> <local sha> <remote ref> <remote sha>" lines on stdin.
//
// It scans every commit about to leave this machine for:
//   - key material by file name: AuthKey_*.p8, *.p8, *.p12, *.pem,
//     *.mobileprovision, *.keystore, *.jks, and any .env file (other than
//     .env.example)
//   - key material by content: PRIVATE KEY blocks, GitHub / AWS / Slack /
//     Google service-account tokens, and the App Store Connect key id and
//     issuer id read from ~/.private_keys/matchimals-asc.env when that file
//     exists (the values themselves never appear in this script)
//
//   bun scripts/check-secrets.mjs --range origin/main..HEAD   # check by hand
//   SKIP_SECRETS_CHECK=1 git push                             # bypass, deliberately
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

const ZERO = /^0{40}$/;
const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });

const FILE_RULES = [
  [/(^|\/)AuthKey_[^/]*\.p8$/i, "App Store Connect API key file"],
  [/\.p8$/i, "private key file (.p8)"],
  [/\.p12$/i, "certificate + private key bundle (.p12)"],
  [/\.pem$/i, "key or certificate (.pem)"],
  [/\.mobileprovision$/i, "provisioning profile"],
  [/\.(keystore|jks)$/i, "Android keystore"],
  [/(^|\/)\.env(\.[^/]*)?$/i, "environment file", (f) => !/\.env\.example$/i.test(f)],
  [/(^|\/)[^/]*-asc\.env$/i, "App Store Connect env file"],
];

const CONTENT_RULES = [
  [/-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED |PGP )?PRIVATE KEY(?: BLOCK)?-----/, "private key block"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}\b/, "GitHub token"],
  [/\bgithub_pat_[A-Za-z0-9_]{60,}\b/, "GitHub fine-grained token"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key id"],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, "Slack token"],
  [/"private_key_id"\s*:\s*"[0-9a-f]{20,}"/, "Google service account key"],
  [/\bASC_(?:KEY|ISSUER)_ID\s*=\s*[A-Za-z0-9-]{8,}/, "App Store Connect key/issuer id assignment"],
];

// The real ids, if this Mac has them, so a stray paste of either is caught even without the variable name.
const secretsFile = path.join(os.homedir(), ".private_keys", "matchimals-asc.env");
const env = await readFile(secretsFile, "utf8").catch(() => "");
for (const [name, label] of [
  ["ASC_KEY_ID", "the App Store Connect key id"],
  ["ASC_ISSUER_ID", "the App Store Connect issuer id"],
]) {
  const value = env.match(new RegExp(`^${name}=(.+)$`, "m"))?.[1]?.trim();
  if (value && value.length >= 8) CONTENT_RULES.push([new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), label]);
}

const args = process.argv.slice(2);
const ranges = [];
const rangeAt = args.indexOf("--range");
if (rangeAt >= 0) ranges.push(args[rangeAt + 1]);
else {
  const stdin = await new Response(Bun.stdin).text();
  for (const line of stdin.split("\n")) {
    const [, localSha, , remoteSha] = line.trim().split(/\s+/);
    if (!localSha || ZERO.test(localSha)) continue; // a deletion
    ranges.push(ZERO.test(remoteSha) ? `${localSha} --not --remotes` : `${remoteSha}..${localSha}`);
  }
}

const findings = [];
for (const range of ranges) {
  const commits = git("rev-list", ...range.split(" ")).split("\n").filter(Boolean);
  for (const sha of commits) {
    const patch = git("show", "--format=%H%n%s", "--unified=0", "--no-color", "--diff-filter=AM", sha);
    let file = "";
    for (const line of patch.split("\n")) {
      if (line.startsWith("+++ b/")) {
        file = line.slice(6);
        for (const [re, label, extra] of FILE_RULES) {
          if (re.test(file) && (!extra || extra(file))) findings.push({ sha, file, label: `${label} added` });
        }
        continue;
      }
      if (!line.startsWith("+") || line.startsWith("+++")) continue;
      if (line.length > 4000) continue;
      for (const [re, label] of CONTENT_RULES) {
        if (re.test(line)) findings.push({ sha, file, label });
      }
    }
  }
}

if (findings.length) {
  console.error("✖ push refused: this would publish secrets to a public repository\n");
  const seen = new Set();
  for (const f of findings) {
    const key = `${f.sha}${f.file}${f.label}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.error(`  ${f.sha.slice(0, 7)}  ${f.file || "(unknown file)"}  —  ${f.label}`);
  }
  console.error("\nRemove the secret from the commit (git rm --cached / amend / rebase), then push again.");
  console.error("If this is a false positive: SKIP_SECRETS_CHECK=1 git push");
  process.exit(1);
}
const n = ranges.length;
console.log(`✓ no secrets in the ${n === 1 ? "commits" : `commits of ${n} refs`} being pushed`);
