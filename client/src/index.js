import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainStyle from './MainStyle.css';
import StyleEffects from './StyleEffects.css';
import Colors from './Colors.css';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
