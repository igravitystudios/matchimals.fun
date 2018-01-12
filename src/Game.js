import BGGame from 'boardgame.io/game';
import shuffle from 'lodash/shuffle';
import data from './data';

function isVictory(cells) {
  // Return true if cells is in a winning configuration.
}

export function isLegalMove(cells, id, currentCard) {
  let topCard = null,
    rightCard = null,
    bottomCard = null,
    leftCard = null;

  // Find neighbor indices
  let topIndex = id - data.width;
  let rightIndex = id + 1;
  let leftIndex = id - 1;
  let bottomIndex = id + data.width;

  // Set neighbor cards if within board boundaries
  if (topIndex >= 0) {
    topCard = cells[topIndex];
  }
  if (bottomIndex < cells.length) {
    bottomCard = cells[bottomIndex];
  }
  if (rightIndex % data.width !== 0 && rightIndex < cells.length - 1) {
    rightCard = cells[rightIndex];
  }
  if (leftIndex % data.width !== data.width - 1 && leftIndex >= 0) {
    leftCard = cells[leftIndex];
  }

  // Check for matching side
  if (
    topCard == null &&
    rightCard == null &&
    bottomCard == null &&
    leftCard == null
  ) {
    return false; //Return false if no neighbor cards exist
  }
  if (
    (topCard == null || currentCard.top === topCard.bottom) &&
    (rightCard == null || currentCard.right === rightCard.left) &&
    (bottomCard == null || currentCard.bottom === bottomCard.top) &&
    (leftCard == null || currentCard.left === leftCard.right)
  ) {
    return true; //Return true if there exists a match
  }

  return false; //Return false if there are no neighboring cards that match
}

const Game = BGGame({
  // The setup method is passed numPlayers, which is set in the BGClient
  setup: numPlayers => {
    // Initial Game State– `G`
    const G = {
      cells: data.board,
      players: {},
    };

    // Populate the initial deck
    let fulldeck = data.deck;

    // Add a deck for every additional player
    for (let i = 0; i < numPlayers - 1; i++) {
      fulldeck = fulldeck.concat(data.deck);
    }

    // Shuffle resulting deck using lodash
    fulldeck = shuffle(fulldeck);

    // Snapshot the length of the entire deck before we chop it up
    const length = fulldeck.length;

    // Set up the game state for each player, and deal them a part of the deck
    for (let j = 0; j < numPlayers; j++) {
      G.players[j] = {
        score: 0,
        deck: fulldeck.splice(0, length / numPlayers),
      };
    }

    return G;
  },

  moves: {
    clickCell(G, ctx, id) {
      // Clone cells and deck state so we don't mutate values
      const cells = [...G.cells];
      const deck = [...G.players[ctx.currentPlayer].deck];
      const currentCard = deck[0];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        if (isLegalMove(cells, id, currentCard)) {
          cells[id] = currentCard;
          deck.shift();
        }
      }

      // Return a copy of game state, along with updated cells and players' decks
      return { ...G, cells, deck };
    },

    pass(G, ctx, id) {
      // Clone deck state so we don't mutate values
      const deck = [...G.deck];

      // Place top card to bottom of deck
      deck.push(deck.shift());

      // Return a copy of game state, along with updated cells and deck
      return { ...G, deck };
    },
  },

  victory: (G, ctx) => {
    return isVictory(G.cells) ? ctx.currentPlayer : null;
  },
});

export default Game;
