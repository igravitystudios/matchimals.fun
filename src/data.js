const animals = {
  bee: {
    image: require('./cards/bee.svg'),
    color: 'red',
    value: 10,
  },
  bunny: {
    image: require('./cards/bunny.svg'),
    color: 'red',
    value: 10,
  },
  cat: {
    image: require('./cards/cat.svg'),
    color: 'red',
    value: 10,
  },
  chick: {
    image: require('./cards/chick.svg'),
    color: 'red',
    value: 10,
  },
  cow: {
    image: require('./cards/cow.svg'),
    color: 'red',
    value: 10,
  },
  dog: {
    image: require('./cards/dog.svg'),
    color: 'red',
    value: 10,
  },
  duck: {
    image: require('./cards/duck.svg'),
    color: 'red',
    value: 10,
  },
  elephant: {
    image: require('./cards/elephant.svg'),
    color: 'red',
    value: 10,
  },
  flower: {
    image: require('./cards/flower.svg'),
    color: 'red',
    value: 10,
  },
  horse: {
    image: require('./cards/horse.svg'),
    color: 'red',
    value: 10,
  },
  owl: {
    image: require('./cards/owl.svg'),
    color: 'red',
    value: 10,
  },
  pig: {
    image: require('./cards/pig.svg'),
    color: 'red',
    value: 10,
  },
  sheep: {
    image: require('./cards/sheep.svg'),
    color: 'red',
    value: 10,
  },
  tiger: {
    image: require('./cards/tiger.svg'),
    color: 'red',
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
