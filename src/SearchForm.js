import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: ''
    }

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(e) {
    this.setState({
      query: e.target.value
    });

    if (e.target.value.length >= 3) {
      this.props.onSearchSubmit(e.target.value);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const query = this.state.query.trim().toLowerCase();

    if (!query) {
      return;
    }

    this.props.onSearchSubmit(query);
    this.setState({
      query: ''
    });
  }

  render() {
    return (
      <form className="searchForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Type a Pokémon's name!"
          value={this.state.query}
          onChange={this.handleQueryChange}
        />
        <input type="submit" value="GO" />
      </form>
    );
  }
}

export default SearchForm;
