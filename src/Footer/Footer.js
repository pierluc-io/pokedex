import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <p>Feat. Azure DocumentDB, Azure Functions, Azure Search & React</p>
        <p><a href="https://github.com/pierluc-io/pokedex">Code available on GitHub</a></p>
        <p>MIT &copy; <a href="https://www.pierluc.io/">Pier-Luc Gendreau</a></p>
      </div>
    );
  }
}

export default Footer;
