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
        {...rest}
        style={{ background: isOver ? 'rgba(41,26,19,0.420)' : 'transparent' }}
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
      return {};
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
