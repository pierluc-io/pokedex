import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App baseUrl="https://pokeapi.co/api/v2/pokemon/" />,
  document.getElementById('root')
);
