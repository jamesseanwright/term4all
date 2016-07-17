'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const AppContainer = require('./containers/AppContainer');
const getStore = require('./getStore');
const store = getStore();
const { getInitialAppState } = require('./actions/appActions');

const appTarget = document.querySelector('#app');

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,

	appTarget
);

appTarget.querySelector('.terminal__input').focus();