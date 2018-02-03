import React, { PureComponent } from 'react';
import { DropTarget } from 'react-dnd';

class Cell extends PureComponent {
  render() {
    const {
      children,
      connectDropTarget,
      id,
      isOver,
      canDrop,
      ...rest
    } = this.props;

    console.log('Rendered Cell (connectDropTarget)');

    return connectDropTarget(
      <div
        id={id}
        style={{
          width: '100%',
          height: '100%',
          background: isOver ? 'rgba(41,26,19,0.420)' : 'transparent',
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

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
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(Cell);
