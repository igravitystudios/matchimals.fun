const width = 7;
const height = 7;
const center = Math.floor(width * height / 2);
const board = Array(width * height).fill(null);
board[center] = {
  top: 'cow',
  right: 'chicken',
  bottom: 'hamster',
  left: 'pig',
};

const cards = {
  bat: {
    image: require('./cards/bat.svg'),
    color: '#DC6349',
    value: 1,
  },
  bear: {
    image: require('./cards/bear.svg'),
    color: '#C5D9B2',
    value: 7,
  },
  boar: {
    image: require('./cards/boar.svg'),
    color: '#879796',
    value: 3,
  },
  bunny: {
    image: require('./cards/bunny.svg'),
    color: '#EBE18C',
    value: 2,
  },
  butterfly: {
    image: require('./cards/butterfly.svg'),
    color: '#4C514A',
    value: 2,
  },
  cat: {
    image: require('./cards/cat.svg'),
    color: '#448D7A',
    value: 10,
  },
  chick: {
    image: require('./cards/chick.svg'),
    color: '#88A764',
    value: 2,
  },
  chicken: {
    image: require('./cards/chicken.svg'),
    color: '#318EA8',
    value: 4,
  },
  cow: {
    image: require('./cards/cow.svg'),
    color: '#D8A027',
    value: 4,
  },
  dog: {
    image: require('./cards/dog.svg'),
    color: '#A55C55',
    value: 10,
  },
  flower: {
    image: require('./cards/flower.svg'),
    color: '#BAB393',
    value: 1,
  },
  fox: {
    image: require('./cards/fox.svg'),
    color: '#0E9163',
    value: 9,
  },
  frog: {
    image: require('./cards/frog.svg'),
    color: '#D66B29',
    value: 4,
  },
  giraffe: {
    image: require('./cards/giraffe.svg'),
    color: '#907A62',
    value: 2,
  },
  gorilla: {
    image: require('./cards/gorilla.svg'),
    color: '#F0C0A8',
    value: 7,
  },
  hamster: {
    image: require('./cards/hamster.svg'),
    color: '#F17A97',
    value: 3,
  },
  koala: {
    image: require('./cards/koala.svg'),
    color: '#755854',
    value: 8,
  },
  lion: {
    image: require('./cards/lion.svg'),
    color: '#88A34F',
    value: 8,
  },
  monkey: {
    image: require('./cards/monkey.svg'),
    color: '#C48285',
    value: 7,
  },
  mouse: {
    image: require('./cards/mouse.svg'),
    color: '#EDCC6B',
    value: 4,
  },
  owl: {
    image: require('./cards/owl.svg'),
    color: '#D86060',
    value: 2,
  },
  panda: {
    image: require('./cards/panda.svg'),
    color: '#824119',
    value: 7,
  },
  penguin: {
    image: require('./cards/penguin.svg'),
    color: '#FFB05A',
    value: 3,
  },
  pig: {
    image: require('./cards/pig.svg'),
    color: '#C0D8C0',
    value: 4,
  },
  tiger: {
    image: require('./cards/tiger.svg'),
    color: '#D8D8A8',
    value: 6,
  },
  turtle: {
    image: require('./cards/turtle.svg'),
    color: '#915466',
    value: 5,
  },
  wolf: {
    image: require('./cards/wolf.svg'),
    color: '#B1C4BB',
    value: 7,
  },
};

const deck = [
  {
    top: 'panda',
    right: 'frog',
    bottom: 'butterfly', // TODO: Queen Bee
    left: 'bat',
  },
  {
    top: 'giraffe',
    right: 'cat',
    bottom: 'mouse',
    left: 'butterfly',
  },
  {
    top: 'boar',
    right: 'butterfly',
    bottom: 'cow',
    left: 'flower',
  },
  {
    top: 'cow',
    right: 'chicken',
    bottom: 'hamster',
    left: 'pig',
  },
  {
    top: 'penguin',
    right: 'dog',
    bottom: 'monkey',
    left: 'turtle',
  },
  {
    top: 'giraffe',
    right: 'turtle',
    bottom: 'lion',
    left: 'dog',
  },
  {
    top: 'mouse',
    right: 'bat',
    bottom: 'owl',
    left: 'chicken',
  },
  {
    top: 'wolf',
    right: 'pig',
    bottom: 'chick',
    left: 'cat',
  },
  {
    top: 'giraffe',
    right: 'cat',
    bottom: 'mouse',
    left: 'butterfly',
  },
  {
    top: 'mouse',
    right: 'bunny',
    bottom: 'giraffe',
    left: 'gorilla',
  },
  {
    top: 'fox',
    right: 'bear',
    bottom: 'chick',
    left: 'boar',
  },
  {
    top: 'chick',
    right: 'tiger',
    bottom: 'wolf',
    left: 'bunny',
  },
  {
    top: 'lion',
    right: 'bat',
    bottom: 'giraffe',
    left: 'koala',
  },
  {
    top: 'monkey',
    right: 'cow',
    bottom: 'penguin',
    left: 'bear',
  },
  {
    top: 'boar',
    right: 'butterfly',
    bottom: 'cow',
    left: 'flower',
  },
  {
    top: 'cow',
    right: 'chicken',
    bottom: 'hamster',
    left: 'pig',
  },
  {
    top: 'mouse',
    right: 'bunny',
    bottom: 'giraffe',
    left: 'gorilla',
  },
  {
    top: 'cow',
    right: 'gorilla',
    bottom: 'boar',
    left: 'frog',
  },
  {
    top: 'chick',
    right: 'turtle',
    bottom: 'fox',
    left: 'bat',
  },
  {
    top: 'giraffe',
    right: 'turtle',
    bottom: 'lion',
    left: 'dog',
  },
  {
    top: 'owl',
    right: 'boar',
    bottom: 'mouse',
    left: 'butterfly',
  },
  {
    top: 'panda',
    right: 'frog',
    bottom: 'butterfly',
    left: 'bat',
  },
  {
    top: 'butterfly',
    right: 'flower',
    bottom: 'panda',
    left: 'lion',
  },
  {
    top: 'penguin',
    right: 'dog',
    bottom: 'monkey',
    left: 'turtle',
  },
  {
    top: 'chick',
    right: 'turtle',
    bottom: 'fox',
    left: 'bat',
  },
  {
    top: 'mouse',
    right: 'bat',
    bottom: 'owl',
    left: 'chicken',
  },
  {
    top: 'cow',
    right: 'gorilla',
    bottom: 'boar',
    left: 'frog',
  },
  {
    top: 'fox',
    right: 'bear',
    bottom: 'chick',
    left: 'boar',
  },
  {
    top: 'lion',
    right: 'bat',
    bottom: 'giraffe',
    left: 'koala',
  },
  {
    top: 'butterfly',
    right: 'flower',
    bottom: 'panda',
    left: 'lion',
  },
  {
    top: 'hamster',
    right: 'butterfly',
    bottom: 'cow',
    left: 'tiger',
  },
  {
    top: 'chick',
    right: 'tiger',
    bottom: 'wolf',
    left: 'bunny',
  },
  {
    top: 'wolf',
    right: 'pig',
    bottom: 'chick',
    left: 'cat',
  },
  {
    top: 'monkey',
    right: 'cow',
    bottom: 'penguin',
    left: 'bear',
  },
];

module.exports = {
  board,
  cards,
  deck,
  width,
  height,
};
