import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import store from 'store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
