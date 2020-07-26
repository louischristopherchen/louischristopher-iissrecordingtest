import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const videoJsOptions = {
  controls: true,
  bigPlayButton: false,
  width: 320,
  height: 240,
  fluid: false,
  plugins: {
      record: {
          audio: true,
          video: true,
          maxLength: 3600,
          debug: true
      }
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App { ...videoJsOptions } />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
