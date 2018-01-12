const width = 13;
const height = 13;
const center = Math.floor(width * height / 2);
const board = Array(width * height).fill(null);

const deck = [
  {
    top: 'frog',
    right: 'fox',
    bottom: 'boar',
    left: 'bat',
  },
  {
    top: 'hedgehog',
    right: 'cat',
    bottom: 'koala',
    left: 'boar',
  },
  {
    top: 'giraffe',
    right: 'boar',
    bottom: 'cow',
    left: 'flower',
  },
  {
    top: 'cow',
    right: 'penguin',
    bottom: 'chicken',
    left: 'pig',
  },
  {
    top: 'mouse',
    right: 'dog',
    bottom: 'monkey',
    left: 'hamster',
  },
  {
    top: 'butterfly',
    right: 'panda',
    bottom: 'lion',
    left: 'dog',
  },
  {
    top: 'koala',
    right: 'bat',
    bottom: 'owl',
    left: 'penguin',
  },
  {
    top: 'zebra',
    right: 'pig',
    bottom: 'chick',
    left: 'cat',
  },
  {
    top: 'koala',
    right: 'bunny',
    bottom: 'hedgehog',
    left: 'wolf',
  },
  {
    top: 'turtle',
    right: 'bear',
    bottom: 'chick',
    left: 'giraffe',
  },
  {
    top: 'chick',
    right: 'tiger',
    bottom: 'zebra',
    left: 'bunny',
  },
  {
    top: 'lion',
    right: 'bat',
    bottom: 'butterfly',
    left: 'cow',
  },
  {
    top: 'boar',
    right: 'flower',
    bottom: 'frog',
    left: 'panda',
  },
  {
    top: 'cow',
    right: 'wolf',
    bottom: 'giraffe',
    left: 'fox',
  },
  {
    top: 'chick',
    right: 'hamster',
    bottom: 'turtle',
    left: 'bat',
  },
  {
    top: 'monkey',
    right: 'cow',
    bottom: 'mouse',
    left: 'bear',
  },
  {
    top: 'chicken',
    right: 'boar',
    bottom: 'cow',
    left: 'tiger',
  },
  {
    top: 'owl',
    right: 'giraffe',
    bottom: 'koala',
    left: 'boar',
  },
];

board[center] = deck[Math.floor(Math.random() * deck.length)];

module.exports = {
  board,
  deck,
  width,
  height,
};
