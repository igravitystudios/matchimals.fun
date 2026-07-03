#!/usr/bin/env bash
#
# Deploy the iOS app to TestFlight, entirely on this machine.
#
#   bun run deploy:ios
#
# Pipeline: guardrails → bump ios.buildNumber in app.json (+ commit) →
# expo prebuild → xcodebuild archive → xcodebuild -exportArchive with
# destination:upload (sends the build to App Store Connect) → git tag.
#
# One-time setup is described in the README ("Deploying to TestFlight").
set -euo pipefail

cd "$(dirname "$0")/.."

err() {
  echo "✖ $1" >&2
  exit 1
}

setup_help() {
  cat >&2 <<'EOF'
✖ Missing App Store Connect credentials. One-time setup:

  1. App Store Connect → Users and Access → Integrations → App Store Connect API
     → generate a Team key with the "App Manager" role.
     Note the Key ID and Issuer ID.
  2. mkdir -p ~/.appstoreconnect/private_keys
     and move the downloaded AuthKey_<KEYID>.p8 there.
  3. cp .env.example .env
     and fill in ASC_KEY_ID and ASC_ISSUER_ID.
EOF
  exit 1
}

# --- Guardrails --------------------------------------------------------------

branch=$(git rev-parse --abbrev-ref HEAD)
[[ "$branch" == "main" ]] || err "Deploys must run from main (currently on '$branch')."
[[ -z "$(git status --porcelain)" ]] || err "Working tree is dirty — commit or stash first."

echo "▸ Typechecking…"
bun run typecheck

# --- Credentials -------------------------------------------------------------

[[ -f .env ]] || setup_help
set -a
source .env
set +a
[[ -n "${ASC_KEY_ID:-}" && -n "${ASC_ISSUER_ID:-}" ]] || setup_help

ASC_KEY_PATH="$HOME/.appstoreconnect/private_keys/AuthKey_${ASC_KEY_ID}.p8"
[[ -f "$ASC_KEY_PATH" ]] || setup_help

# --- Bump build number (app.json is the CNG source of truth) -----------------

BUILD_NUMBER=$(bun -e '
  const file = "app.json";
  const json = await Bun.file(file).json();
  const next = String(Number(json.expo.ios.buildNumber) + 1);
  json.expo.ios.buildNumber = next;
  await Bun.write(file, JSON.stringify(json, null, 2) + "\n");
  console.log(next);
')
VERSION=$(bun -e 'console.log((await Bun.file("app.json").json()).expo.version)')
TEAM_ID=$(bun -e 'console.log((await Bun.file("app.json").json()).expo.ios.appleTeamId)')

echo "▸ Deploying Matchimals ${VERSION} (build ${BUILD_NUMBER})"
git add app.json
git commit -m "chore: bump iOS build number to ${BUILD_NUMBER}"

# --- Prebuild (regenerates ios/ from app.json) --------------------------------

echo "▸ Prebuilding…"
bun run prebuild

# --- Archive ------------------------------------------------------------------

ARCHIVE_PATH="build/Matchimals.xcarchive"
rm -rf "$ARCHIVE_PATH"

echo "▸ Archiving (this takes a while)…"
xcodebuild -workspace ios/Matchimals.xcworkspace \
  -scheme Matchimals \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -archivePath "$ARCHIVE_PATH" \
  archive \
  -allowProvisioningUpdates \
  -authenticationKeyPath "$ASC_KEY_PATH" \
  -authenticationKeyID "$ASC_KEY_ID" \
  -authenticationKeyIssuerID "$ASC_ISSUER_ID"

# --- Export & upload to App Store Connect ------------------------------------

cat > build/ExportOptions.plist <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>
  <key>destination</key>
  <string>upload</string>
  <key>teamID</key>
  <string>${TEAM_ID}</string>
  <key>signingStyle</key>
  <string>automatic</string>
  <key>uploadSymbols</key>
  <true/>
  <key>manageAppVersionAndBuildNumber</key>
  <false/>
</dict>
</plist>
EOF

echo "▸ Uploading to App Store Connect…"
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportOptionsPlist build/ExportOptions.plist \
  -exportPath build/export \
  -allowProvisioningUpdates \
  -authenticationKeyPath "$ASC_KEY_PATH" \
  -authenticationKeyID "$ASC_KEY_ID" \
  -authenticationKeyIssuerID "$ASC_ISSUER_ID"

# --- Tag ----------------------------------------------------------------------

TAG="ios-v${VERSION}-${BUILD_NUMBER}"
git tag "$TAG"

echo "✔ Uploaded build ${BUILD_NUMBER} — it will appear in TestFlight once Apple finishes processing."
echo "  Tagged ${TAG}. Don't forget: git push --follow-tags"
