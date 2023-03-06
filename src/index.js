import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app'; // импорт компонента из файла app.js
import AppInfo from './components/app-info/app-info';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
