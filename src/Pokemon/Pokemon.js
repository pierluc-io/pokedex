import React, { Component, PropTypes } from 'react';
import './Pokemon.css';

class Pokemon extends Component {
  constructor(props) {
    super(props)

    this.onPinClicked = this.onPinClicked.bind(this)
  }

  damageRelations(types) {
    const damageRelations = {
      no_damage_from: [],
      quarter_damage_from: [],
      half_damage_from: [],
      full_damage_from: [],
      double_damage_from: [],
      quad_damage_from: []
    }

    const damageMultiplierMap = Object.freeze({
      no_damage_from: 0,
      quarter_damage_from: 0.25,
      half_damage_from: 0.5,
      full_damage_from: 1,
      double_damage_from: 2,
      quad_damage_from: 4
    })

    for (let i = 0; i < types.length; i++) {
      for (let tKey in types[i]) {
        if (!types[i].hasOwnProperty(tKey) || tKey.indexOf('_from') < 0) {
          continue
        }

        types[i][tKey].forEach((type) => {
          if (i === 0) {
            damageRelations[tKey].push(type)
          } else {
            let match = false

            for (let drKey in damageRelations) {
              if (match || !damageRelations.hasOwnProperty(drKey)) {
                continue
              }

              for (let j = 0; j < damageRelations[drKey].length; j++) {
                if (type !== damageRelations[drKey][j]) {
                  continue
                }

                const damageMultiplier = damageMultiplierMap[tKey] * damageMultiplierMap[drKey]

                match = true
                damageRelations[drKey].splice(j, 1);

                switch (damageMultiplier) {
                  case 0:
                    damageRelations.no_damage_from.push(type)
                    break
                  case 0.25:
                    damageRelations.quarter_damage_from.push(type)
                    break
                  case 0.5:
                    damageRelations.half_damage_from.push(type)
                    break
                  case 1:
                    damageRelations.full_damage_from.push(type)
                    break
                  case 2:
                    damageRelations.double_damage_from.push(type)
                    break
                  case 4:
                    damageRelations.quad_damage_from.push(type)
                    break
                  default:
                    throw new Error('Could not find damage multiplier!')
                }
              }
            }

            if (!match) {
              damageRelations[tKey].push(type)
            }
          }
        })
      }
    }

    return damageRelations
  }

  onPinClicked() {
    this.props.onPin(this.props.item)
  }

  render() {
    const createItem = (item) => {
      return ( 
        <span className="badge alert-success" key={item}>{item}</span>
      );
    };

    const createTypeRelationRowTo = (type, index, array) => {
      return (
        <tr key={index}>
          <td>{type.name}</td>
          <td>{type.no_damage_to.length > 0 ? type.no_damage_to.join(', ') : "-"}</td>
          <td>{type.half_damage_to.length > 0 ? type.half_damage_to.join(', ') : "-"}</td>
          <td>{type.double_damage_to.length > 0 ? type.double_damage_to.join(', ') : "-"}</td>
        </tr>
      );
    };

    const createTypeRelationRowFrom = (damageRelations) => {
      return (
        <tr key="damageRelations">
          <td>{damageRelations.no_damage_from.length > 0 ? damageRelations.no_damage_from.join(', ') : "-"}</td>
          <td>{damageRelations.quarter_damage_from.length > 0 ? damageRelations.quarter_damage_from.join(', ') : "-"}</td>
          <td>{damageRelations.half_damage_from.length > 0 ? damageRelations.half_damage_from.join(', ') : "-"}</td>
          <td>{damageRelations.double_damage_from.length > 0 ? damageRelations.double_damage_from.join(', ') : "-"}</td>
          <td>{damageRelations.quad_damage_from.length > 0 ? damageRelations.quad_damage_from.join(', ') : "-"}</td>
        </tr>
      );
    };

    return (
      <div className="Pokemon">
        {/*<img className="PokemonImage" src={`https://pokeapi.co/media/sprites/pokemon/${this.props.item.resource_id}.png`} alt="{this.props.item.name}" width="96" height="96" />*/}
        <div className="PokemonContent">
          <h3 className="PokemonName">
            <span>{this.props.item.name}</span>
            <a onClick={this.onPinClicked}>{this.props.isPinned ? 'Unpin' : 'Pin'}</a>
          </h3>
          <div className={`PokemonType ${this.props.item.types.join(' ')}`}>{this.props.item.types.map(createItem)}</div>
          <h4 className="PokemonDamageDone">Damage done</h4>
          <table className="PokemonDamageDoneTable">
            <thead>
              <tr>
                <th></th>
                <th>0x</th>
                <th>0.5x</th>
                <th>2x</th>
              </tr>
            </thead>
            <tbody>
              {this.props.types.map(createTypeRelationRowTo)}
            </tbody>
          </table>
          <h4 className="PokemonDamageTaken">Damage taken</h4>
          <table className="PokemonDamageTakenTable">
            <thead>
              <tr>
                <th>0x</th>
                <th>0.25x</th>
                <th>0.5x</th>
                <th>2x</th>
                <th>4x</th>
              </tr>
            </thead>
            <tbody>
              {createTypeRelationRowFrom(this.damageRelations(this.props.types))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Pokemon.propTypes = {
  item: PropTypes.object.isRequired,
  isPinned: PropTypes.bool.isRequired,
  onPin: PropTypes.func.isRequired
}

export default Pokemon;
