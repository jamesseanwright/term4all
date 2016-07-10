const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const reducers = require('./reducers');

module.exports = function getStore() {
	return createStore(
		reducers,
		applyMiddleware(thunk)
	);
}