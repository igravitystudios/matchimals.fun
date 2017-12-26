import Game from 'boardgame.io/game';
import data from './data';

function IsVictory(cells) {
  // Return true if cells is in a winning configuration.
}

const BusyBee = Game({
  setup: () => ({
    cells: data.board,
    deck: data.deck
  }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];
      const deck = [...G.deck];
      const currentCard = deck.shift();

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        let topCard = null, rightCard = null, bottomCard = null, leftCard = null;

        let topIndex = id - data.width;
        let rightIndex = id + 1;
        let leftIndex = id - 1;
        let bottomIndex = id + data.width;

        if (topIndex >= 0) {
          topCard = cells[topIndex];
        }
        if (bottomIndex < cells.length) {
          bottomCard = cells[bottomIndex];
        }
        if ((rightIndex % data.width !== 0) && (rightIndex < cells.length - 1)) {
          rightCard = cells[rightIndex];
        }
        if ((leftIndex % data.width !== data.width - 1) && (leftIndex >= 0)) {
          leftCard = cells[leftIndex];
        }

        console.log("Top", topCard, "Right", rightCard, "Bottom", bottomCard, "Left", leftCard);

        // cells[id] = ctx.currentPlayer;
        cells[id] = currentCard;
      }

      return { ...G, cells, deck};
    },
  },

  victory: (G, ctx) => {
    return IsVictory(G.cells) ? ctx.currentPlayer : null;
  },
});

export default BusyBee;
