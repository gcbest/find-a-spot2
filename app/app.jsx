import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory();
var { Provider } = require('react-redux');

import Main from './components/Main';

var actions = require('./actions/actions');
var store = require('./store/configureStore').configure();

store.subscribe(() => {
  var state = store.getState();

  console.log('New state', state);
});

// Load foundation
require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

require('style-loader!css-loader!./styles/app.css');

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
