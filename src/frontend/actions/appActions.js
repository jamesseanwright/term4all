'use strict';

const commandClient = require('../clients/commandClient');

module.exports = {
	GET_INITIAL_APP_STATE: 'GET_INITIAL_APP_STATE',
	RECEIVE_INITIAL_APP_STATE: 'RECEIVE_INITIAL_APP_STATE',

	_receiveInitialAppState(state) {
		return {
			type: RECEIVE_INITIAL_APP_STATE,
			state
		};
	},

	getInitialAppState(state) {
		return (dispatch, getState) => {
			commandClient.once('output', output => {
				const state = JSON.parse(output);
				dispatch(this._receiveInitialAppState(state));
			});

			commandClient.begin('getInitialAppState');
		};
	}
};