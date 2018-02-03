import React from 'react';
import { DropTarget } from 'react-dnd';

const Cell = ({ children, connectDropTarget, isOver, canDrop, ...rest }) =>
  connectDropTarget(
    <div
      {...rest}
      style={{ background: isOver ? 'rgba(41,26,19,0.420)' : 'transparent' }}
    >
      {children}
    </div>
  );

export default DropTarget(
  'CARD',
  {
    canDrop(props) {
      return {};
    },
    drop(props) {
      console.log(props);
      props.onClick(props.id);
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(Cell);
