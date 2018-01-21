import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import classNames from 'classnames';

import Card from '../Card';

const Deck = ({ cards, classes, className, flipped, ...rest }) => (
  <div className={classNames(classes.root, className)}>
    {cards.map((card, i) => (
      <Card
        key={i}
        card={card}
        flipped={i === 0 && flipped}
        style={{
          position: i ? 'absolute' : 'inherit',
          left: i,
          zIndex: -i,
        }}
      />
    ))}
  </div>
);

Deck.defaultProps = {
  cards: [],
};

Deck.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default withStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    zIndex: '101',
  },
})(Deck);
