import React, { Component } from 'react';
import compose from 'lodash/fp/compose';
import { DragSource, DropTarget } from 'react-dnd';
import DropTypes from './DropTypes';


class Item extends Component {
  render() {
    return this.props.connectDragSource(this.props.connectDropTarget(
      <li>{this.props.item}</li>,
    ));
  }
}

const dropSpec = {
  canDrop() {
    return true;
  },
  hover(props, monitor, component) {
    console.log('hovering');
  },
  drop(props, monitor, component) {
    console.log('dropped!');
  },
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const dragSpec = {
  beginDrag({ item }) {
    return { item };
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}


export default compose(
  DragSource(DropTypes.ITEM, dragSpec, dragCollect),
  DropTarget(DropTypes.ITEM, dropSpec, dropCollect),
)(Item);
