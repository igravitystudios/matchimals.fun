const animals = {
  bee: require("./cards/bee.svg"),
  bunny: require("./cards/bunny.svg"),
  cat: require("./cards/cat.svg"),
  chick: require("./cards/chick.svg"),
  cow: require("./cards/cow.svg"),
  dog: require("./cards/dog.svg"),
  duck: require("./cards/duck.svg"),
  elephant: require("./cards/elephant.svg"),
  flower: require("./cards/flower.svg"),
  horse: require("./cards/horse.svg"),
  owl: require("./cards/owl.svg"),
  pig: require("./cards/pig.svg"),
  sheep: require("./cards/sheep.svg"),
  tiger: require("./cards/tiger.svg")
};

const board = Array(144).fill(null);

const demo = {
  top: { animal: "bunny", color: "red" },
  right: { animal: "cow", color: "blue" },
  bottom: { animal: "tiger", color: "orange" },
  left: { animal: "sheep", color: "green" }
};

export default {
  animals,
  board,
  demo
};
