import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'

import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/header.jsx';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
const store = createStore(
	rootReducer,
	applyMiddleware(createPromise(), thunk, createLogger())
);

ReactDOM.render(
    <BrowserRouter> 
      <Provider store={store}> 
      <ReactNotification />
        <Header />
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
