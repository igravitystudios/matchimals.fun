import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import Card from '../Card';

const Deck = ({
  cards,
  className,
  connectDragSource,
  flipped,
  isDragging,
  ...rest
}) => (
  <div
    className={className}
    style={{
      position: 'relative',
      display: 'inline-flex',
      zIndex: '101',
    }}
  >
    {cards.map(
      (card, i) =>
        i === 0 && flipped ? (
          connectDragSource(
            <div key={i}>
              <Card
                card={card}
                className={isDragging ? '' : ''}
                flipped={i === 0 && flipped}
                style={{
                  position: i ? 'absolute' : 'inherit',
                  left: i,
                  zIndex: -i,
                  transform: isDragging ? 'scale(1.337)' : 'scale(1)',
                }}
              />
            </div>
          )
        ) : (
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
        )
    )}
  </div>
);

Deck.defaultProps = {
  cards: [],
};

Deck.propTypes = {
  cards: PropTypes.array.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

const ohNo = {
  beginDrag(props) {
    return {};
  },
};

const hmmm = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource('CARD', ohNo, hmmm)(Deck);
