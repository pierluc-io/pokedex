import React, { Component } from 'react';
import SearchForm from './SearchForm'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: []
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(query) {
    fetch(`${this.props.baseUrl}?api-version=2015-02-28&search=${query}*`, {
      'Content-Type': 'application/json',
      'api-key': 'A02F0B15D7E5E0C11FE6BA675B82C2D0'
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status)
      }

      return response.json()
    }).then((result) => {
      this.setState({
        pokemon: result.value.map((v) => {
          return {
            score: v['@search.score'],
            id: v.id,
            name: v.name,
            types: JSON.parse(v.types),
            resource: v.resource,
            resource_id: v.resource_id
          }
        })
      });
    }).catch((err) => {
      console.error(err)

      this.setState({
        pokemon: {
          name: "a Pokémon that doesn't exist"
        }
      });
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Hello, search for Pokémon!
        </p>
        <SearchForm onSearchSubmit={this.handleSearchSubmit} />
        <pre>{JSON.stringify(this.state.pokemon, null, 2) }</pre>
      </div>
    );
  }
}

export default App;
