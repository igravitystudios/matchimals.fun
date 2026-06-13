# Ideas

A running list of ideas for Matchimals.fun. These are intentionally high-level — no implementation details, just directions worth exploring.

## Gameplay

- **Online multiplayer** — real-time games between players on different devices (boardgame.io already supports a server/client split).
- **Pass-and-play polish** — clearer turn handoff, "your turn" prompts, per-player ready screens.
- **AI opponent** — a single-player bot so there's always someone to play against.
- **Difficulty levels** — smaller/larger decks, time pressure, or limited passes.
- **Daily puzzle** — one shared shuffled deck per day, with a shareable score.
- **Hints** — highlight a legal placement when a player is stuck.
- **Undo last move** — take back an accidental placement before the turn ends.
- **Game variants** — alternate scoring rules, "no passing" mode, or larger boards.

## Content

- **More animals** — expand the deck and animal roster for variety.
- **Themed card sets** — seasonal or unlockable visual themes.
- **Custom player names** — let players name themselves instead of random animal labels.
- **Avatars / colors** — let players pick their animal and color.

## Polish & feel

- **Web sound effects** — currently a no-op on web; add the audio that native already has.
- **Better animations** — card placement, scoring, and connection feedback.
- **Pinch-to-zoom** — pinch in/out to zoom the board for a wider overview or a closer look.
- **Haptics** — tactile feedback on valid/invalid drops (native).
- **Accessibility** — color-blind-friendly palettes, larger touch targets, screen-reader labels.
- **Tutorial / onboarding** — a guided first game for new players.

## Platform

- **Android release** — README links a Play Store listing, but `app.json` only targets iOS + web; revisit Android support.
- **Tablet / large-screen layout** — make better use of bigger displays.
- **PWA / installable web** — offline play and add-to-home-screen on the web build.

## Technical

- **Seeded RNG** — replace lodash `shuffle`/random card with boardgame.io's deterministic RNG (noted as a TODO in `game.js`; required for fair networked play and reproducible games).
- **Test coverage** — no test suite exists yet; the game rules (`isLegalMove`, `calculateScore`, `getNeighbors`) are pure functions and easy to unit test.
- **Save / resume** — persist an in-progress game so it survives an app close.
- **Stats tracking** — games played is already stored; expand to wins, high scores, streaks.
- **Analytics review** — confirm Firebase events cover the funnels worth measuring.
