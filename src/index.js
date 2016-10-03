import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './reset.css';
import './index.css';

ReactDOM.render(
  <App baseUrl="https://pierluc-io.search.windows.net/indexes" />,
  document.getElementById('root')
);
