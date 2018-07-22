import React from 'react';
import ReactDOM from 'react-dom';
import './overrides.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './containers/app'
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store'
import { Provider } from 'react-redux'

const target = document.querySelector('#root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker();