import React, { Component } from 'react';
import Footer from '../Footer'
import Header from '../Header'
import SearchForm from '../SearchForm'
import PinList from '../PinList'
import PokemonList from '../PokemonList'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pin: [],
      pokemon: []
    };

    this.getHeaders = this.getHeaders.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.onPin = this.onPin.bind(this);
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

  onPin(item) {
    const pin = this.state.pin.filter((p) => p.resource_id !== item.resource_id)

    if (pin.length === this.state.pin.length) {
      pin.push(item)
    }

    this.setState({ pin })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm onSearchSubmit={this.handleSearchSubmit} />
        <PinList items={this.state.pin} />
        <PokemonList items={this.state.pokemon} pinnedItems={this.state.pin} onPin={this.onPin} types={this.state.pokemonTypes} />
        <Footer />
      </div>
    );
  }
}

export default App;
