import { Game as BGGame } from 'boardgame.io/core';
import shuffle from 'lodash/shuffle';
import data from './data';
import animals from './constants/animals';

export function getNeighbors(G, id) {
  const { cells } = G;

  //Assume all are null
  let topCard = null,
    rightCard = null,
    bottomCard = null,
    leftCard = null;

  // Find neighbor indices
  const topIndex = id - data.width,
    rightIndex = id + 1,
    leftIndex = id - 1,
    bottomIndex = id + data.width;

  // Set as a neighbor card only if within board boundaries
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

  return { topCard, rightCard, bottomCard, leftCard };
}

export function calculateScore(G, ctx, id) {
  const currentPlayer = G.players[ctx.currentPlayer];
  const currentCard = currentPlayer.deck[0];

  //Assign neighbors
  const neighbors = getNeighbors(G, id);
  const topCard = neighbors.topCard,
    rightCard = neighbors.rightCard,
    bottomCard = neighbors.bottomCard,
    leftCard = neighbors.leftCard;

  //Calculate score for each matching side
  let score = 0;
  if (topCard != null && currentCard.top === topCard.bottom) {
    score += animals[topCard.bottom].score;
    console.log('TopCard: ', topCard);
  }
  if (rightCard != null && currentCard.right === rightCard.left) {
    score += animals[rightCard.left].score;
    console.log('RCard: ', rightCard);
  }
  if (bottomCard != null && currentCard.bottom === bottomCard.top) {
    score += animals[bottomCard.top].score;
    console.log('BCard: ', bottomCard);
  }
  if (leftCard != null && currentCard.left === leftCard.right) {
    score += animals[leftCard.right].score;
    console.log('LCard: ', leftCard);
  }
  console.log('Score: ', score);
  return score;
}

export function isLegalMove(G, ctx, id) {
  const currentPlayer = G.players[ctx.currentPlayer];
  const currentCard = currentPlayer.deck[0];

  //Assign neighbors
  const neighbors = getNeighbors(G, id);
  const topCard = neighbors.topCard,
    rightCard = neighbors.rightCard,
    bottomCard = neighbors.bottomCard,
    leftCard = neighbors.leftCard;

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
      // Clone cells and players state so we don't mutate values
      const cells = [...G.cells];
      const players = { ...G.players };
      const currentDeck = players[ctx.currentPlayer].deck;
      const currentCard = currentDeck[0];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        if (isLegalMove(G, ctx, id)) {
          //Lay the card on the board
          cells[id] = currentCard;
          players[ctx.currentPlayer].score += calculateScore(G, ctx, id);

          //Next card shifts up the deck
          currentDeck.shift();
        }
      }

      // Return a copy of game state, along with updated cells and players state
      return { ...G, cells, players };
    },

    pass(G, ctx) {
      // Clone players state so we don't mutate values
      const players = { ...G.players };
      const deck = players[ctx.currentPlayer].deck;

      // Place top card to bottom of deck
      deck.push(deck.shift());

      // Return a copy of game state, along with updated cells and deck
      return { ...G, players };
    },

    resetGame(numPlayers) {
      return Game.setup(numPlayers);
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      // TODO: Logic to end game
      // if (isVictory(G, ctx)) {
      //   return ctx.currentPlayer;
      // }
    },
  },
});

export default Game;
