import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img className="HeaderLogo" src={logo} alt="logo" />
        <h1 className="HeaderTitle">Instantly find Pokémon!</h1>
      </div>
    );
  }
}

export default Header;
