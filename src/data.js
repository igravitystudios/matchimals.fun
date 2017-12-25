const animals = {
  bee: {
    image: require('./cards/bee.svg'),
    color: '#DC3F1C',
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
  duck: {
    image: require('./cards/duck.svg'),
    color: '#824119',
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
  horse: {
    image: require('./cards/horse.svg'),
    color: '#B1C4BB',
    value: 10,
  },
  owl: {
    image: require('./cards/owl.svg'),
    color: '#D86060',
    value: 10,
  },
  pig: {
    image: require('./cards/pig.svg'),
    color: '#C0D8C0',
    value: 10,
  },
  rooster: {
    image: require('./cards/rooster.svg'),
    color: 'red',
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
};

const board = Array(144).fill(null);

const demo1 = {
  top: 'bunny',
  right: 'cow',
  bottom: 'horse',
  left: 'sheep',
};
const demo2 = {
  top: 'chick',
  right: 'pig',
  bottom: 'owl',
  left: 'cow',
};
const demo3 = {
  top: 'bunny',
  right: 'tiger',
  bottom: 'sheep',
  left: 'pig',
};
const demo4 = {
  top: 'dog',
  right: 'flower',
  bottom: 'horse',
  left: 'tiger',
};

const deck = [
  {
    top: 'duck',
    right: 'deer',
    bottom: 'queenbee',
    left: 'apple',
  },
  {
    top: 'swan',
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
    bottom: 'squirrel',
    left: 'pig',
  },
  {
    top: 'kangaroo',
    right: 'dog',
    bottom: 'monkey',
    left: 'hippo',
  },
  {
    top: 'bird',
    right: 'rhino',
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
    top: 'swan',
    right: 'cat',
    bottom: 'horse',
    left: 'bee',
  },
  {
    top: 'horse',
    right: 'bunny',
    bottom: 'swan',
    left: 'sheep',
  },
  {
    top: 'seal',
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
    left: 'goat',
  },
  {
    top: 'monkey',
    right: 'cow',
    bottom: 'kangaroo',
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
    bottom: 'squirrel',
    left: 'pig',
  },
  {
    top: 'horse',
    right: 'bunny',
    bottom: 'swan',
    left: 'sheep',
  },
  {
    top: 'cow',
    right: 'sheep',
    bottom: 'elephant',
    left: 'deer',
  },
  {
    top: 'chick',
    right: 'hippo',
    bottom: 'seal',
    left: 'apple',
  },
  {
    top: 'bird',
    right: 'hippo',
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
    top: 'duck',
    right: 'deer',
    bottom: 'bee',
    left: 'apple',
  },
  {
    top: 'bee',
    right: 'flower',
    bottom: 'duck',
    left: 'rhino',
  },
  {
    top: 'kangaroo',
    right: 'dog',
    bottom: 'monkey',
    left: 'hippo',
  },
  {
    top: 'chick',
    right: 'hippo',
    bottom: 'seal',
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
    left: 'deer',
  },
  {
    top: 'seal',
    right: 'bear',
    bottom: 'chick',
    left: 'elephant',
  },
  {
    top: 'lion',
    right: 'apple',
    bottom: 'bird',
    left: 'goat',
  },
  {
    top: 'bee',
    right: 'flower',
    bottom: 'duck',
    left: 'rhino',
  },
  {
    top: 'squirrel',
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
    bottom: 'kangaroo',
    left: 'bear',
  },
];

export default {
  animals,
  board,
  demo1,
  demo2,
  demo3,
  demo4,
};
