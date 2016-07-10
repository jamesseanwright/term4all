'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const App = require('./components/App/index.jsx');
const getStore = require('./getStore');
const store = getStore();

const appTarget = document.querySelector('#app');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	appTarget
);

appTarget.querySelector('.terminal__input').focus();