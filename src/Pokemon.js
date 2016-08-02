import React, { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {
  render() {
    const createItem = function(item) {
      return ( 
        <span className="badge alert-success" key={item}>{item}</span>
      );
    };

    return (
      <li className="Pokemon media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={`http://pokeapi.co/media/sprites/pokemon/${this.props.item.resource_id}.png`} alt="{this.props.item.name}" width="96" height="96" />
          </a>
        </div>
        <div className="media-body">
          <h3 className="media-heading">{this.props.item.name}</h3>
          {this.props.item.types.map(createItem)}
        </div>
      </li>
    );
  }
}

export default Pokemon;
