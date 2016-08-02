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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="SearchForm" onReset={this.handleReset} onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              className="form-control input-lg"
              type="text"
              placeholder="Type a Pokémon's name!"
              value={this.state.query}
              onChange={this.handleQueryChange}
            />
            <span className="input-group-btn">
              <input className="btn btn-primary btn-block btn-lg" type="reset" value="X" />
            </span>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;