import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

const globalStore = createStore(rootReducer);

const renderApp = (store) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

renderApp(globalStore);

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(globalStore);
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
