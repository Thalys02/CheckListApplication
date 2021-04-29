import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FiCircle,FiSquare,FiTriangle} from 'react-icons/fi'
import "./global.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <header>
        <div className="system-bar">
          <span><FiCircle/></span>
          <span><FiSquare/></span>
          <span><FiTriangle/></span>
        </div>
      </header>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
