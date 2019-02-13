import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/app';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';

const store = configureStore();

const HotRootComponent = hot(module)(App);

ReactDOM.render(
  <Provider store={store}>
    <HotRootComponent />
  </Provider>, document.getElementById('root')
);
