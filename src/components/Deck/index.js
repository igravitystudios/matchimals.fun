import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';

import Card from '../Card';

const Deck = ({
  cards,
  classes,
  className,
  connectDragSource,
  flipped,
  isDragging,
  ...rest
}) => (
  <div className={classNames(classes.root, className)}>
    {cards.map(
      (card, i) =>
        i === 0 ? (
          connectDragSource(
            <div
              key={i}
              style={{
                transform: isDragging ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Card
                card={card}
                flipped={i === 0 && flipped}
                style={{
                  position: i ? 'absolute' : 'inherit',
                  left: i,
                  zIndex: -i,
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

  // Injected by React DnD:
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default withStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    zIndex: '101',
  },
})(
  DragSource(
    'CARD',
    {
      beginDrag() {
        return {};
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Deck)
);
