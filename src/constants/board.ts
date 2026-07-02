export const columns = 25; // because lazy math elsewhere, these *must* be odd
export const rows = 19; // because lazy math elsewhere, these *must* be odd
export const cells: null[] = Array(columns * rows).fill(null);
export const center = Math.floor(columns * (rows / 2));

export const cardWidth = 100;
export const cardHeight = 140;
export const animalSize = 60;

// const cardWidth = 240;
// const cardHeight = 336;
// const animalSize = 144;

export const boardWidth = cardWidth * columns;
export const boardHeight = cardHeight * rows;
