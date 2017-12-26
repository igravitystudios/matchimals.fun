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
