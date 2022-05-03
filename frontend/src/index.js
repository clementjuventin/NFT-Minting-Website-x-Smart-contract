import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Interface from './Interface'
import Info from './Info';
import reportWebVitals from './reportWebVitals';
import Logo from './Logo';

const root = ReactDOM.createRoot(document.getElementById('root'));

const script = document.createElement("script");

script.src = process.env.PUBLIC_URL + "/script.js";
script.async = true;

document.body.appendChild(script);

// Contract addr 0x92Bf38Acc559b283AC5aCced82b1e8D7BaEa33f9

root.render(
  <React.StrictMode>
    <App />
    <Interface />
    <Info />
    <Logo />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
