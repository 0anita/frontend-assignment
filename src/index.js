import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Features/store';
import { SearchProvider } from './contexts/SearchContext';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
