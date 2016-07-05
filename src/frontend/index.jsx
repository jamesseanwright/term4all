'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const reducers = require('./reducers');
const App = require('./components/App.jsx');

const store = createStore(
	reducers,
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.querySelector('#app')
);