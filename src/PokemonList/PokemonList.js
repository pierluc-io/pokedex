import React, { Component, PropTypes } from 'react';
import Pokemon from '../Pokemon'
import './PokemonList.css';

class PokemonList extends Component {
  constructor(props) {
    super(props)

    this.isPinned = this.isPinned.bind(this)
  }

  isPinned(item) {
    return this.props.pinnedItems.some((pinnedItem) => pinnedItem.resource_id === item.resource_id)
  }

  render() {
    const createItem = (item, types) => {
      return (
        <Pokemon key={item.resource_id} item={item} isPinned={this.isPinned(item)} onPin={this.props.onPin} types={item.types.map((t) => {
          return Object.assign(this.props.types[t], {
            name: t
          })
        })} />
      );
    };

    return (
      <div className="PokemonList">{this.props.items.map(createItem)}</div>
    );
  }
}

PokemonList.propTypes = {
  items: PropTypes.array.isRequired,
  pinnedItems: PropTypes.array.isRequired,
  onPin: PropTypes.func.isRequired
}

export default PokemonList;
