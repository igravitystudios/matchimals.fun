export const deck = [
  {
    top: 11,
    right: 10,
    bottom: 2,
    left: 0,
  },
  {
    top: 15,
    right: 5,
    bottom: 16,
    left: 2,
  },
  {
    top: 13,
    right: 2,
    bottom: 8,
    left: 27,
  },
  {
    top: 8,
    right: 22,
    bottom: 7,
    left: 23,
  },
  {
    top: 19,
    right: 9,
    bottom: 18,
    left: 14,
  },
  {
    top: 4,
    right: 21,
    bottom: 17,
    left: 9,
  },
  {
    top: 16,
    right: 0,
    bottom: 20,
    left: 22,
  },
  {
    top: 12,
    right: 23,
    bottom: 6,
    left: 5,
  },
  {
    top: 16,
    right: 3,
    bottom: 15,
    left: 26,
  },
  {
    top: 25,
    right: 1,
    bottom: 6,
    left: 13,
  },
  {
    top: 6,
    right: 24,
    bottom: 12,
    left: 3,
  },
  {
    top: 17,
    right: 0,
    bottom: 4,
    left: 8,
  },
  {
    top: 2,
    right: 27,
    bottom: 11,
    left: 21,
  },
  {
    top: 8,
    right: 26,
    bottom: 13,
    left: 10,
  },
  {
    top: 6,
    right: 14,
    bottom: 25,
    left: 0,
  },
  {
    top: 18,
    right: 8,
    bottom: 19,
    left: 1,
  },
  {
    top: 7,
    right: 2,
    bottom: 8,
    left: 24,
  },
  {
    top: 20,
    right: 13,
    bottom: 16,
    left: 2,
  },
];

export const getRandomCard = (deck) =>
  deck[Math.floor(Math.random() * deck.length)];
