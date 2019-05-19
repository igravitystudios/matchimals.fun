import React from 'react';

const Card = props => (
  <svg viewBox="0 0 100 140" {...props}>
    <title>Busy Bee Card</title>
    <path fill="#f90000" d="M50 70L0 140h100L50 70z" />
    <path fill="#003bf7" d="M50 70l50-70H0l50 70z" />
    <path fill="#f2e000" d="M50 70l50 70V0L50 70z" />
    <path fill="#04a813" d="M50 70L0 0v140l50-70z" />
  </svg>
);

export default Card;
