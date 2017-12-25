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

const demo = {
  top: 'bunny',
  right: 'cow',
  bottom: 'horse',
  left: 'sheep',
};

export default {
  animals,
  board,
  demo,
};
