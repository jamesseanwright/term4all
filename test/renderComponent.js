'use strict';

const jsdom = require('jsdom');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Provider } = require('react-redux');
const getStore = require('../src/frontend/getStore');

global.renderComponent = function renderComponent(Component, props) {
	return new Promise((resolve, reject) => {
		const store = getStore();

		const reactElement = React.createElement(Component, props);		
		const provider = React.createElement(Provider, { store }, reactElement);
		const markup = ReactDOMServer.renderToString(provider);

		jsdom.env(markup, (err, window) => {
			if (err) {
				reject(err);
			} else {
				resolve(window.document.body.firstChild);
			}
		})
	});
};