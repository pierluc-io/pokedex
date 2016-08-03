import React, { Component } from 'react';
import Pokemon from '../Pokemon'
import './PokemonList.css';

class PokemonList extends Component {
  render() {
    const createItem = (item, types) => {
      return (
        <Pokemon key={item.resource_id} item={item} types={item.types.map((t) => {
          return Object.assign(this.props.types[t], {
            name: t
          })
        })} />
      );
    };

    return (
      <ul className="PokemonList media-list">{this.props.items.map(createItem)}</ul>
    );
  }
}

export default PokemonList;
