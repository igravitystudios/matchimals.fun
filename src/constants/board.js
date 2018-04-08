const height = 20;
const width = 30;
const cells = Array(width * height).fill(null);
const center = Math.floor(width * height / 2);

module.exports = {
  width,
  height,
  cells,
  center,
};
