import React, { Component } from 'react';
import Pokemon from '../Pokemon'
import './PokemonList.css';

class PokemonList extends Component {
  render() {
    const createItem = function(item) {
      return (
        <Pokemon key={item.resource_id} item={item} />
      );
    };

    return (
      <ul className="PokemonList media-list">{this.props.items.map(createItem)}</ul>
    );
  }
}

export default PokemonList;
