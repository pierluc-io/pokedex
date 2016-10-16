import React, { Component } from 'react';
import Pin from '../Pin'
import './PinList.css';

class PinList extends Component {
  render() {
    const createItem = (item, types) => {
      return (
        <Pin key={item.resource_id} item={item} />
      );
    };

    return (
      <div className="PinList">{this.props.items.map(createItem)}</div>
    );
  }
}

export default PinList;
