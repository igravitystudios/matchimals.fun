# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Matchimals.fun is an animal-matching puzzle card game shipped to iOS and the web. It's an [Expo](https://expo.dev) (SDK 56) React Native app using [boardgame.io](https://boardgame.io) for turn-based game logic. Package manager is **bun**.

## Commands

```bash
bun install            # install deps
bun run ios            # build & run in iOS simulator (expo run:ios)
bun run web            # run web version (expo start --web)
bun run start          # expo dev server
bun run test           # jest (jest-expo preset, --passWithNoTests)
bun run format         # prettier on src/**

bun run prebuild       # regenerate ios/ from app.json (expo prebuild -p ios --clean)
bun run build:web      # static web export to dist/ (expo export -p web)
```

Run a single test: `bun run test -- path/to/file.test.js` (or `-t "name"`). There is currently no test suite, so `test` passes with no tests.

Lint: `.eslintrc` extends `@react-native`; `lint-staged` runs prettier on commit (husky `precommit`).

## Continuous native generation

The `ios/` directory is **generated** from `app.json` (and the config plugins) — it is not the source of truth and is gitignored. Never hand-edit native iOS files expecting changes to persist; edit `app.json` or a config plugin and re-run `bun run prebuild`. Building requires Xcode + CocoaPods. Releases are built locally (no paid EAS): bump `version`/`ios.buildNumber` in `app.json`, then archive in Xcode or `bunx eas build -p ios --local`. See the build-philosophy memory: no fastlane, no paid EAS.

`plugins/withFirebaseNoAdId.js` is a custom dangerous-mod plugin that prepends `$RNFirebaseAnalyticsWithoutAdIdSupport=true` to the Podfile so AdSupport.framework isn't linked (keeps the App Store privacy declaration clean).

## Architecture

**Game state lives in boardgame.io, not React.** `src/Matchimals/game.js` is the pure game definition (`setup`, `moves`, `turn.moveLimit: 1`, `endIf`). `src/App.js` wraps the board with `Client({ board: Matchimals, game, numPlayers })`. The board component (`src/Matchimals/index.js`) receives `G` (game state), `ctx`, and `moves` as props and calls `moves.placeCard(id)` / `moves.pass()` to mutate state. `G` is an Immer draft, so moves mutate it directly.

**The board model.** The play area is a fixed `columns × rows` (25 × 19, both must be odd) grid of `cells` — a flat array indexed `row * columns + col`. The first card is placed at `center`. Cards have four edges (`top/right/bottom/left`) holding animal IDs; two cards connect when touching edges share an ID. Core predicates in `game.js`: `getNeighbors`, `isLegalMove`, `calculateScore` (sums `animals[id].score` per matching edge), `canCardsConnect`. The deck is one copy of `constants/cards.js` per player, shuffled (lodash — there are TODOs to switch to boardgame.io's seeded RNG for future server play).

**Drag-and-drop → cell index.** Dropping a card doesn't carry a target cell; `onCardDrop` in `src/Matchimals/index.js` computes it geometrically from the dropped card's screen position vs. the scrollable `Table`'s offset, dividing by `cardWidth`/`cardHeight` to get a `(row, col)`, then `row * columns + col`. `constants/board.js` holds all these dimensions. If drag placement is off, this math (and the Table's measured offset) is the place to look.

**Platform splits via `.web.js`.** Several modules have a web variant resolved automatically by Metro: `Music` (native plays audio via expo-audio; web is a no-op empty provider), `Dialog`, `Nameplate`. When touching these, update both files.

**Animals** (`src/Animals/`) are individual react-native-svg components; `src/Animals/index.js` is the registry. `src/hooks/players.js` assigns each of up to 4 players a random animal + color via a PlayerProvider context.

## Conventions

- Prettier (default config, `.prettierrc`) — let `bun run format` handle style; don't hand-format.
- Components are folders with an `index.js`; assets (png/jpg/svg/mp4) live beside the component that uses them.
- `tsconfig.json` extends Expo's base but the codebase is JS; types come from `@types/react`.
