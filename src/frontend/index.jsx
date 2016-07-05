'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore } = require('redux');
const reducers = require('./reducers');
const App = require('./components/App.jsx');

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.querySelector('#app')
);