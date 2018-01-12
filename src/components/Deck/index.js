import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: props.flipped || false,
    };
  }

  flip = () => {
    this.setState(() => ({
      flipped: true,
    }));
  };

  render() {
    const { cards } = this.props;
    const { flipped } = this.state;

    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          zIndex: '999',
        }}
        onClick={this.flip}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            card={card}
            flipped={i === 0 && flipped}
            style={{
              position: i ? 'absolute' : 'inherit',
              left: i,
              zIndex: -i,
              cursor: flipped ? 'inherit' : 'pointer',
            }}
          />
        ))}
      </div>
    );
  }
}

Deck.defaultProps = {
  cards: [],
};

Deck.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default Deck;
