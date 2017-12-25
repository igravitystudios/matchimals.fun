const board = Array(144).fill(null);

const cards = {
  apple: {
    image: require('./cards/apple.svg'),
    color: 'black',
    value: 10,
  },
  bear: {
    image: require('./cards/bear.svg'),
    color: 'black',
    value: 10,
  },
  bee: {
    image: require('./cards/bee.svg'),
    color: '#DC3F1C',
    value: 10,
  },
  bird: {
    image: require('./cards/bird.svg'),
    color: 'black',
    value: 10,
  },
  bunny: {
    image: require('./cards/bunny.svg'),
    color: '#EBE18C',
    value: 10,
  },
  cat: {
    image: require('./cards/cat.svg'),
    color: '#448D7A',
    value: 10,
  },
  chick: {
    image: require('./cards/chick.svg'),
    color: '#88A764',
    value: 10,
  },
  chipmunk: {
    image: require('./cards/chipmunk.svg'),
    color: 'black',
    value: 10,
  },
  cow: {
    image: require('./cards/cow.svg'),
    color: '#D8A027',
    value: 10,
  },
  dog: {
    image: require('./cards/dog.svg'),
    color: '#D66B29',
    value: 10,
  },
  elephant: {
    image: require('./cards/elephant.svg'),
    color: '#A89F4D',
    value: 10,
  },
  flower: {
    image: require('./cards/flower.svg'),
    color: '#BAB393',
    value: 10,
  },
  fox: {
    image: require('./cards/fox.svg'),
    color: 'black',
    value: 10,
  },
  horse: {
    image: require('./cards/horse.svg'),
    color: '#B1C4BB',
    value: 10,
  },
  koala: {
    image: require('./cards/koala.svg'),
    color: 'black',
    value: 10,
  },
  lion: {
    image: require('./cards/lion.svg'),
    color: 'black',
    value: 10,
  },
  monkey: {
    image: require('./cards/monkey.svg'),
    color: '#D86060',
    value: 10,
  },
  owl: {
    image: require('./cards/owl.svg'),
    color: '#D86060',
    value: 10,
  },
  panda: {
    image: require('./cards/panda.svg'),
    color: '#824119',
    value: 10,
  },
  penguin: {
    image: require('./cards/penguin.svg'),
    color: 'black',
    value: 10,
  },
  pig: {
    image: require('./cards/pig.svg'),
    color: '#C0D8C0',
    value: 10,
  },
  ram: {
    image: require('./cards/ram.svg'),
    color: 'black',
    value: 10,
  },
  rooster: {
    image: require('./cards/rooster.svg'),
    color: 'black',
    value: 10,
  },
  sheep: {
    image: require('./cards/sheep.svg'),
    color: '#F0C0A8',
    value: 10,
  },
  tiger: {
    image: require('./cards/tiger.svg'),
    color: '#D8D8A8',
    value: 10,
  },
  turtle: {
    image: require('./cards/turtle.svg'),
    color: 'black',
    value: 10,
  },
  zebra: {
    image: require('./cards/zebra.svg'),
    color: 'black',
    value: 10,
  },
};

const deck = [
  {
    top: 'panda',
    right: 'ram',
    bottom: 'bee', // TODO: Queen Bee
    left: 'apple',
  },
  {
    top: 'bird',
    right: 'cat',
    bottom: 'horse',
    left: 'bee',
  },
  {
    top: 'elephant',
    right: 'bee',
    bottom: 'cow',
    left: 'flower',
  },
  {
    top: 'cow',
    right: 'rooster',
    bottom: 'chipmunk',
    left: 'pig',
  },
  {
    top: 'penguin',
    right: 'dog',
    bottom: 'monkey',
    left: 'turtle',
  },
  {
    top: 'bird',
    right: 'lion',
    bottom: 'lion',
    left: 'dog',
  },
  {
    top: 'horse',
    right: 'apple',
    bottom: 'owl',
    left: 'rooster',
  },
  {
    top: 'zebra',
    right: 'pig',
    bottom: 'chick',
    left: 'cat',
  },
  {
    top: 'bird',
    right: 'cat',
    bottom: 'horse',
    left: 'bee',
  },
  {
    top: 'horse',
    right: 'bunny',
    bottom: 'bird',
    left: 'sheep',
  },
  {
    top: 'fox',
    right: 'bear',
    bottom: 'chick',
    left: 'elephant',
  },
  {
    top: 'chick',
    right: 'tiger',
    bottom: 'zebra',
    left: 'bunny',
  },
  {
    top: 'lion',
    right: 'apple',
    bottom: 'bird',
    left: 'koala',
  },
  {
    top: 'monkey',
    right: 'cow',
    bottom: 'penguin',
    left: 'bear',
  },
  {
    top: 'elephant',
    right: 'bee',
    bottom: 'cow',
    left: 'flower',
  },
  {
    top: 'cow',
    right: 'chicken',
    bottom: 'chipmunk',
    left: 'pig',
  },
  {
    top: 'horse',
    right: 'bunny',
    bottom: 'bird',
    left: 'sheep',
  },
  {
    top: 'cow',
    right: 'sheep',
    bottom: 'elephant',
    left: 'ram',
  },
  {
    top: 'chick',
    right: 'turtle',
    bottom: 'fox',
    left: 'apple',
  },
  {
    top: 'bird',
    right: 'turtle',
    bottom: 'lion',
    left: 'dog',
  },
  {
    top: 'owl',
    right: 'elephant',
    bottom: 'horse',
    left: 'bee',
  },
  {
    top: 'panda',
    right: 'ram',
    bottom: 'bee',
    left: 'apple',
  },
  {
    top: 'bee',
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
    left: 'apple',
  },
  {
    top: 'horse',
    right: 'apple',
    bottom: 'owl',
    left: 'rooster',
  },
  {
    top: 'cow',
    right: 'sheep',
    bottom: 'elephant',
    left: 'ram',
  },
  {
    top: 'fox',
    right: 'bear',
    bottom: 'chick',
    left: 'elephant',
  },
  {
    top: 'lion',
    right: 'apple',
    bottom: 'bird',
    left: 'koala',
  },
  {
    top: 'bee',
    right: 'flower',
    bottom: 'panda',
    left: 'lion',
  },
  {
    top: 'chipmunk',
    right: 'bee',
    bottom: 'cow',
    left: 'tiger',
  },
  {
    top: 'chick',
    right: 'tiger',
    bottom: 'zebra',
    left: 'bunny',
  },
  {
    top: 'zebra',
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

export default {
  board,
  cards,
  deck,
};
