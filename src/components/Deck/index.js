import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: this.props.flipped || false,
    };
  }

  flip = () => {
    this.setState(() => ({
      flipped: true,
    }));
  };

  render() {
    const { cards, style } = this.props;
    const { flipped } = this.state;
    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          minWidth: '400px',
          minHeight: '400px',
          zIndex: '999',
        }}
        onClick={this.flip}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: i * 2,
              left: i,
              zIndex: -i,
            }}
          >
            <Card card={card} flipped={i === 0 && flipped} />
          </div>
        ))}
      </div>
    );
  }
}

Deck.defaultProps = {
  cards: [],
};

Deck.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cards: PropTypes.array.isRequired,
};

export default Deck;
