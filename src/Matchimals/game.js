import shuffle from "lodash/shuffle";
import { cells as emptyCells, center, columns } from "../constants/board";
import { deck, getRandomCard } from "../constants/cards";
import { animals } from "../constants/animals";
import * as snapshots from "./snapshots";

export function getNeighbors(G, id) {
  const { cells } = G;

  //Assume all are null
  let topCard = null,
    rightCard = null,
    bottomCard = null,
    leftCard = null;

  // Find neighbor indices
  const topIndex = id - columns,
    rightIndex = id + 1,
    leftIndex = id - 1,
    bottomIndex = id + columns;

  // Set as a neighbor card only if within board boundaries
  if (topIndex >= 0) {
    topCard = cells[topIndex];
  }
  if (bottomIndex < cells.length) {
    bottomCard = cells[bottomIndex];
  }
  if (rightIndex % columns !== 0 && rightIndex < cells.length - 1) {
    rightCard = cells[rightIndex];
  }
  if (leftIndex % columns !== columns - 1 && leftIndex >= 0) {
    leftCard = cells[leftIndex];
  }

  return { topCard, rightCard, bottomCard, leftCard };
}

export function calculateScore(G, ctx, id) {
  const currentCard = G.deck[0];

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
  if (G.cells[id] !== null) {
    return false;
  }

  const currentCard = G.deck[0];

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

export function canCardsConnect(card1, card2) {
  if (
    card1.top === card2.bottom ||
    card1.bottom === card2.top ||
    card1.left === card2.right ||
    card1.right === card2.left
  ) {
    return true;
  }

  return false;
}

export function getInitialState(ctx) {
  const G = {
    cells: [],
    deck: [],
    players: {},
  };

  // Add a deck for every player
  for (let i = 0; i < ctx.numPlayers; i++) {
    G.deck = G.deck.concat(deck);
  }

  // Shuffle resulting deck using lodash
  G.deck = shuffle(G.deck); // TODO: Use boardgame.io provided random shuffle function, which will be important when we are running a server

  // Set up the game state for each player
  for (let j = 0; j < ctx.numPlayers; j++) {
    G.players[j] = {
      score: 0,
    };
  }

  // Fill the game board
  G.cells = emptyCells;

  // Set the initial card on the board
  const initialCard = getRandomCard(deck); // TODO: Use boardgame.io provided random function
  G.cells[center] = initialCard;

  // Ensure the first card is connectable
  while (!canCardsConnect(G.deck[0], initialCard)) {
    G.deck.push(G.deck.shift()); // Place top card to bottom of deck, try again!
  }

  // For debugging "game over" state– this sets the deck to only have a single card
  // G.deck = new Array(G.deck[0]);

  // console.log("Initial Game State", G, "Initial ctx", ctx);

  // Our game state is ready to go– return it!
  return G;
}

const game = {
  // The setup method is passed ctx
  setup: getInitialState,

  // End turn after a single move, whether it's placeCard or pass
  turn: {
    moveLimit: 1,
  },

  moves: {
    takeSnapshot: (G, ctx, id) => {
      console.log("==> takeSnapshot", G);
    },

    restoreSnapshot: (G, ctx, id) => {
      if (id) {
        return snapshots[id];
      }
    },

    // G and ctx are provided automatically when calling from App– `this.props.moves.placeCard(id)`
    placeCard: (G, ctx, id) => {
      // Ensure we can't overwrite cells.
      if (isLegalMove(G, ctx, id)) {
        //Lay the card on the board
        G.cells[id] = G.deck[0];
        G.players[ctx.currentPlayer].score += calculateScore(G, ctx, id);

        //Next card shifts up the deck
        G.deck.shift();
      }

      // Return the updated game state- because G is an Immer object we can mutate it directly
      return G;
    },

    pass: (G, ctx) => {
      // Place top card to bottom of deck
      G.deck.push(G.deck.shift());

      // Return the updated game state- because G is an Immer object we can mutate it directly
      return G;
    },
  },

  endIf: (G, ctx) => {
    if (G.deck.length === 0) {
      const winner = Object.keys(
        G.players
      ).reduce((previousPlayer, currentPlayer) =>
        G.players[previousPlayer].score > G.players[currentPlayer].score
          ? previousPlayer
          : currentPlayer
      );
      return winner;
    }
  },
};

export default game;
