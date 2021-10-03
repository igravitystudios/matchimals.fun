const columns = 25; // because lazy math elsewhere, these *must* be odd
const rows = 19; // because lazy math elsewhere, these *must* be odd
const cells = Array(columns * rows).fill(null);
const center = Math.floor(columns * (rows / 2));

const cardWidth = 100;
const cardHeight = 140;
const animalSize = 60;

// const cardWidth = 240;
// const cardHeight = 336;
// const animalSize = 144;

const boardWidth = cardWidth * columns;
const boardHeight = cardHeight * rows;

module.exports = {
  columns,
  rows,
  cells,
  center,
  cardWidth,
  cardHeight,
  animalSize,
  boardWidth,
  boardHeight,
};
