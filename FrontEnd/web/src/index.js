import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./global.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <header>
        <div></div>
      </header>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
