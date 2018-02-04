import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

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
      id={id}
      style={{
        background: isOver ? 'rgba(41,26,19,0.420)' : 'transparent',
      }}
      onClick={id => onClick(id)}
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
