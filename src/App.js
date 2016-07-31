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
    fetch(`${this.props.baseUrl}/search/pokemon?q=${query}`, {
      cache: 'force-cache'
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status)
      }

      return response.json()
    }).then((pokemon) => {
      this.setState({ pokemon });
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
