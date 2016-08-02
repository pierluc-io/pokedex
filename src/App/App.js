import React, { Component } from 'react';
import SearchForm from '../SearchForm'
import PokemonList from '../PokemonList'
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
    const headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('api-key', '889DE740A62A3C34F75F7D17FE15DA20')

    fetch(`${this.props.baseUrl}?api-version=2015-02-28&search=${query}*`, { headers }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status)
      }

      return response.json()
    }).then((result) => {
      this.setState({
        pokemon: result.value
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
          <h2>Hello, search for Pokémon!</h2>
          <h3><em>Feat. React, Azure DocumentDB & Azure Search</em></h3>
        </div>
        <SearchForm onSearchSubmit={this.handleSearchSubmit} />
        <PokemonList items={this.state.pokemon} />
      </div>
    );
  }
}

export default App;
