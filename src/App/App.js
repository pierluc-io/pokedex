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

    this.getHeaders = this.getHeaders.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  getHeaders() {
    if (this.headers) {
      return this.headers
    }

    this.headers = new Headers()

    this.headers.set('Content-Type', 'application/json')
    this.headers.set('api-key', '889DE740A62A3C34F75F7D17FE15DA20')

    return this.headers
  }

  componentDidMount() {
    fetch(`${this.props.baseUrl}/pokemon-type/docs?api-version=2015-02-28&search=*`, {
      headers: this.getHeaders()
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status)
      }

      return response.json()
    }).then((result) => {
      const pokemonTypes = {}

      for (let i = 0; i < result.value.length; i++) {
        pokemonTypes[result.value[i].name] = JSON.parse(result.value[i].damage_relations)
      }

      this.setState({ pokemonTypes });
    }).catch((err) => {
      console.error(err)
    })
  }

  handleSearchSubmit(query) {
    fetch(`${this.props.baseUrl}/pokemon/docs?api-version=2015-02-28&search=${query}*`, {
      headers: this.getHeaders()
    }).then((response) => {
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
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Instantly find Pokémon!</h2>
          <hr />
        </div>
        <SearchForm onSearchSubmit={this.handleSearchSubmit} />
        <PokemonList items={this.state.pokemon} types={this.state.pokemonTypes} />
        <p><em>Feat. Azure DocumentDB, Azure Functions, Azure Search & React</em></p>
        <p><em><a href="https://github.com/pierluc-io/pokedex">Code available on GitHub</a></em></p>
        <p><small><em>MIT &copy; <a href="https://www.pierluc.io/">Pier-Luc Gendreau</a></em></small></p>
      </div>
    );
  }
}

export default App;
