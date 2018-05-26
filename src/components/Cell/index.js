import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { center } from '../../constants/board';

// We'll export a ref to the centerCell so we can use it on our Board
export let centerCell;

const Cell = ({
  children,
  connectDropTarget,
  id,
  isOver,
  canDrop,
  onClick,
  ...rest
}) =>
  connectDropTarget(
    <div
      ref={
        id === center
          ? cell => {
              centerCell = cell;
            }
          : null
      }
      id={id}
      style={{
        background: isOver ? 'rgba(41,26,19,0.420)' : 'transparent',
      }}
      onClick={e => onClick(e.target.id)}
      {...rest}
    >
      {children}
    </div>
  );

Cell.propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(
  'CARD',
  {
    canDrop(props) {
      return true;
    },
    drop(props) {
      props.onClick(props.id);
    },
  },
  function(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    };
  }
)(Cell);
