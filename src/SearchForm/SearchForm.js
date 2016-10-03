import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: ''
    }

    this.inputDebounceTimeout = null

    this.componentDidMount = this.componentDidMount.bind(this);
    this.focusSearchInput = this.focusSearchInput.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.focusSearchInput()
  }

  focusSearchInput() {
    this.refs.searchInput.focus()
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

    this.focusSearchInput()
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="SearchForm" onReset={this.handleReset} onSubmit={this.handleSubmit}>
        <input
          className="SearchFormInput"
          type="text"
          placeholder="Type a Pokémon's name"
          value={this.state.query}
          onChange={this.handleQueryChange}
          ref="searchInput"
        />
        <input className="SearchFormResetButton" type="reset" value="&times;" />
      </form>
    );
  }
}

export default SearchForm;
