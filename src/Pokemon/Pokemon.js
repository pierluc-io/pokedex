import React, { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {
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
          <td>{damageRelations.full_damage_from.length > 0 ? damageRelations.full_damage_from.join(', ') : "-"}</td>
          <td>{damageRelations.double_damage_from.length > 0 ? damageRelations.double_damage_from.join(', ') : "-"}</td>
          <td>{damageRelations.quad_damage_from.length > 0 ? damageRelations.quad_damage_from.join(', ') : "-"}</td>
        </tr>
      );
    };

    return (
      <li className="Pokemon media">
        <div className="media-left">
          <img className="media-object" src={`https://pokeapi.co/media/sprites/pokemon/${this.props.item.resource_id}.png`} alt="{this.props.item.name}" width="96" height="96" />
        </div>
        <div className="media-body">
          <h3 className="media-heading">{this.props.item.name}</h3>
          <div>{this.props.item.types.map(createItem)}</div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Attack</th>
                <th>0</th>
                <th>½</th>
                <th>2</th>
              </tr>
            </thead>
            <tbody>
              {this.props.types.map(createTypeRelationRowTo)}
            </tbody>
          </table>
        </div>
        <h4>Damage taken</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>0</th>
                <th>¼</th>
                <th>½</th>
                <th>1</th>
                <th>2</th>
                <th>4</th>
              </tr>
            </thead>
            <tbody>
              {createTypeRelationRowFrom(this.damageRelations(this.props.types))}
            </tbody>
          </table>
        </div>
      </li>
    );
  }
}

export default Pokemon;
