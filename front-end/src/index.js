
import React from 'react';
import ReactDOM from 'react-dom';
//custom css
import './index.css';
import './styles/custom_boostrap/style.css';

//default libraries
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './App';
import reportWebVitals from './reportWebVitals';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//can register service worker if needed.
//registerServiceWorker();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
