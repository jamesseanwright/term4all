'use strict';

const { List } = require('immutable');

const { 
	REQUEST_COMMAND,
	RECEIVE_COMMAND_OUTPUT,
	RECEIVE_COMMAND_ERROR,
	RECEIVE_COMMAND_END
} = require('../actions/commandsActions');

module.exports = function commands(state = List(), action) {
	switch (action.type) {
		case REQUEST_COMMAND:
			state = state.push(action.command);
			return state;

		case RECEIVE_COMMAND_OUTPUT:
			state = state.push(action.command);
			return state;

		case RECEIVE_COMMAND_ERROR:
			state = state.push(action.error);
			return state;

		case RECEIVE_COMMAND_END:
			state = state.push(`Process exited with ${action.exitCode}`);
			return state;

		default:
			return state;
	}
};