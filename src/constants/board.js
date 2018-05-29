const columns = 30;
const rows = 20;
const cells = Array(columns * rows).fill(null);
const center = Math.floor(columns * (rows / 2) + columns / 2);
const cardWidth = 100;
const cardHeight = 140;
const boardWidth = cardWidth * columns;
const boardHeight = cardHeight * rows;

module.exports = {
  columns,
  rows,
  cells,
  center,
  cardWidth,
  cardHeight,
  boardWidth,
  boardHeight,
};
