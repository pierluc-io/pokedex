import React, { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {
  render() {
    const createItem = (item) => {
      return ( 
        <span className="badge alert-success" key={item}>{item}</span>
      );
    };

    const createTypeRelationRowTo = (type, index, array) => {
      return (
        <tr key={index}>
          <td>{type.no_damage_to.join(' ')}</td>
          <td>{type.half_damage_to.join(' ')}</td>
          <td>{type.double_damage_to.join(' ')}</td>
        </tr>
      );
    };

    const createTypeRelationRowFrom = (type, index, array) => {
      return (
        <tr key={index}>
          <td>{type.no_damage_from.join(' ')}</td>
          <td>{type.half_damage_from.join(' ')}</td>
          <td>{type.double_damage_from.join(' ')}</td>
        </tr>
      );
    };

    return (
      <li className="Pokemon media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={`https://pokeapi.co/media/sprites/pokemon/${this.props.item.resource_id}.png`} alt="{this.props.item.name}" width="96" height="96" />
          </a>
        </div>
        <div className="media-body">
          <h3 className="media-heading">{this.props.item.name}</h3>
          <div>{this.props.item.types.map(createItem)}</div>
          <h4>To</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>0</th>
                <th>½</th>
                <th>2</th>
              </tr>
            </thead>
            <tbody>
              {this.props.types.map(createTypeRelationRowTo)}
            </tbody>
          </table>
          <h4>From</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>0</th>
                <th>½</th>
                <th>2</th>
              </tr>
            </thead>
            <tbody>
              {this.props.types.map(createTypeRelationRowFrom)}
            </tbody>
          </table>
        </div>
      </li>
    );
  }
}

export default Pokemon;
