import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Item from './Item';

const items = [
  'One',
  'Two',
  'Three',
  'Four',
];

class App extends Component {
  render() {
    return (
      <ul>
        {items.map(item => (<Item key={item} item={item}/>))}
      </ul>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
