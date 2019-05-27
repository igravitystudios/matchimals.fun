const deck = [
  {
    top: "frog",
    right: "fox",
    bottom: "boar",
    left: "bat",
  },
  {
    top: "hedgehog",
    right: "cat",
    bottom: "koala",
    left: "boar",
  },
  {
    top: "gorilla",
    right: "boar",
    bottom: "cow",
    left: "zebra",
  },
  {
    top: "cow",
    right: "penguin",
    bottom: "chicken",
    left: "pig",
  },
  {
    top: "mouse",
    right: "dog",
    bottom: "monkey",
    left: "hamster",
  },
  {
    top: "butterfly",
    right: "panda",
    bottom: "lion",
    left: "dog",
  },
  {
    top: "koala",
    right: "bat",
    bottom: "owl",
    left: "penguin",
  },
  {
    top: "giraffe",
    right: "pig",
    bottom: "chick",
    left: "cat",
  },
  {
    top: "koala",
    right: "bunny",
    bottom: "hedgehog",
    left: "wolf",
  },
  {
    top: "turtle",
    right: "bear",
    bottom: "chick",
    left: "gorilla",
  },
  {
    top: "chick",
    right: "tiger",
    bottom: "giraffe",
    left: "bunny",
  },
  {
    top: "lion",
    right: "bat",
    bottom: "butterfly",
    left: "cow",
  },
  {
    top: "boar",
    right: "zebra",
    bottom: "frog",
    left: "panda",
  },
  {
    top: "cow",
    right: "wolf",
    bottom: "gorilla",
    left: "fox",
  },
  {
    top: "chick",
    right: "hamster",
    bottom: "turtle",
    left: "bat",
  },
  {
    top: "monkey",
    right: "cow",
    bottom: "mouse",
    left: "bear",
  },
  {
    top: "chicken",
    right: "boar",
    bottom: "cow",
    left: "tiger",
  },
  {
    top: "owl",
    right: "gorilla",
    bottom: "koala",
    left: "boar",
  },
];

const getRandomCard = (deck) => deck[Math.floor(Math.random() * deck.length)];

module.exports = {
  deck,
  getRandomCard,
};
