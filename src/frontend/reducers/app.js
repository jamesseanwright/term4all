'use strict';

const { Map } = require('immutable');
const { RECEIVE_INITIAL_APP_STATE } = require('../actions/appActions');

module.exports = function app(state = Map, action) {
	switch (action.type) {
		case RECEIVE_INITIAL_APP_STATE:
			return state.merge(action.state);

		default:
			return state;
	}
};