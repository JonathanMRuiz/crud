import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
/*Fontawesome icons*/
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);