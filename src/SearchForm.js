import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: ''
    }

    this.inputDebounceTimeout = null

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleQueryChange(e) {
    this.setState({
      query: e.target.value.trim().toLowerCase()
    });

    window.clearTimeout(this.inputDebounceTimeout)

    this.inputDebounceTimeout = window.setTimeout(() => {
      if (this.state.query.length >= 3) {
        this.props.onSearchSubmit(this.state.query);
      }
    }, 350)
  }

  handleReset(e) {
    e.preventDefault();

    this.setState({
      query: ''
    });
  }

  render() {
    return (
      <form className="searchForm" onReset={this.handleReset}>
        <input
          type="text"
          placeholder="Type a Pokémon's name!"
          value={this.state.query}
          onChange={this.handleQueryChange}
        />
        <input type="reset" value="X" />
      </form>
    );
  }
}

export default SearchForm;
