import { Game as BGGame } from 'boardgame.io/core';
import shuffle from 'lodash/shuffle';
import animals from './constants/animals';
import board from './constants/board';
import { deck, getRandomStarters, starters } from './constants/cards';

export function getNeighbors(G, id) {
  const { cells } = G;

  //Assume all are null
  let topCard = null,
    rightCard = null,
    bottomCard = null,
    leftCard = null;

  // Find neighbor indices
  const topIndex = id - board.width,
    rightIndex = id + 1,
    leftIndex = id - 1,
    bottomIndex = id + board.width;

  // Set as a neighbor card only if within board boundaries
  if (topIndex >= 0) {
    topCard = cells[topIndex];
  }
  if (bottomIndex < cells.length) {
    bottomCard = cells[bottomIndex];
  }
  if (rightIndex % board.width !== 0 && rightIndex < cells.length - 1) {
    rightCard = cells[rightIndex];
  }
  if (leftIndex % board.width !== board.width - 1 && leftIndex >= 0) {
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
  }
  if (rightCard != null && currentCard.right === rightCard.left) {
    score += animals[rightCard.left].score;
  }
  if (bottomCard != null && currentCard.bottom === bottomCard.top) {
    score += animals[bottomCard.top].score;
  }
  if (leftCard != null && currentCard.left === leftCard.right) {
    score += animals[leftCard.right].score;
  }
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

export function canFirstCardConnect(player, starters) {
  const firstCard = player.deck[0];
  if (
    firstCard.top === starters.left.bottom ||
    firstCard.top === starters.center.bottom ||
    firstCard.top === starters.right.bottom ||
    firstCard.bottom === starters.left.top ||
    firstCard.bottom === starters.center.top ||
    firstCard.bottom === starters.right.top ||
    firstCard.left === starters.right.right ||
    firstCard.right === starters.left.left
  ) {
    return true;
  }

  return false;
}

export function getInitialState(numPlayers) {
  const G = {
    cells: [],
    players: {},
  };

  // Populate the initial deck
  let fulldeck = [...deck];

  // Add a deck for every additional player
  for (let i = 0; i < numPlayers - 1; i++) {
    fulldeck = fulldeck.concat(deck);
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

  // Fill the game board
  G.cells = board.cells;

  // Set the initial cards on the board
  const randomStarters = getRandomStarters(starters);
  G.cells[board.center - 1] = randomStarters.left;
  G.cells[board.center] = randomStarters.center;
  G.cells[board.center + 1] = randomStarters.right;

  // Ensure each player starts off with a card that is connectable
  for (let k = 0; k < numPlayers; k++) {
    while (!canFirstCardConnect(G.players[k], randomStarters)) {
      const deck = G.players[k].deck;
      deck.push(deck.shift()); // Place top card to bottom of deck, try again!
    }
  }

  // Our game state is ready to go– return it!
  return G;
}

const Game = BGGame({
  // The setup method is passed numPlayers, which is set in the BGClient
  setup: getInitialState,

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

      // Return a copy of game state, along with updated deck
      return { ...G, players };
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      // TODO: Logic should be based on ctx.numPlayers
      if (G.players[0].deck.length === 0 && G.players[1].deck.length === 0) {
        if (G.players[0].score > G.players[1].score) {
          return '0';
        } else {
          // TODO: Need to also handle a tie game
          return '1';
        }
      }
    },
  },
});

export default Game;
