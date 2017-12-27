import Game from 'boardgame.io/game';
import data from './data';

function isVictory(cells) {
  // Return true if cells is in a winning configuration.
}

function isLegalMove(cells, id, currentCard) {
  let topCard = null,
    rightCard = null,
    bottomCard = null,
    leftCard = null;

  //Find neighbor indices
  let topIndex = id - data.width;
  let rightIndex = id + 1;
  let leftIndex = id - 1;
  let bottomIndex = id + data.width;

  //Set neighbor cards if within board
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

  //Check for matching side
  if (
    (topCard !== null && currentCard.top === topCard.bottom) ||
    (rightCard !== null && currentCard.right === rightCard.left) ||
    (bottomCard !== null && currentCard.bottom === bottomCard.top) ||
    (leftCard !== null && currentCard.left === leftCard.right)
  ) {
    return true;
  }
  return false;
}

const BusyBee = Game({
  setup: () => ({
    cells: data.board,
    deck: data.deck,
  }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];
      const deck = [...G.deck];
      const currentCard = deck[0];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        if (isLegalMove(cells, id, currentCard)) {
          cells[id] = currentCard;
          deck.shift();
        }
      }

      return { ...G, cells, deck };
    },
  },

  victory: (G, ctx) => {
    return isVictory(G.cells) ? ctx.currentPlayer : null;
  },
});

export default BusyBee;
