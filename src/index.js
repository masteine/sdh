import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './utils/store/index';
import browserHistory from './utils/history';
import AppRouter from './utils/router/index';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
