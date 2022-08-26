import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'storeon/react';

import App from './App';
import { store } from './store';

import './styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
