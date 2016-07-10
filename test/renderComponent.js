'use strict';

const jsdom = require('jsdom');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

global.renderComponent = function renderComponent(Component, props) {
	return new Promise((resolve, reject) => {
		const reactElement = React.createElement(Component, props);		
		const markup = ReactDOMServer.renderToString(reactElement);

		jsdom.env(markup, (err, window) => {
			if (err) {
				reject(err);
			} else {
				resolve(window.document.body.firstChild);
			}
		})
	});
};