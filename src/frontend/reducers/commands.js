'use strict';

const { List } = require('immutable');

const { 
	REQUEST_COMMAND,
	RECEIVE_COMMAND_OUTPUT,
	RECEIVE_COMMAND_ERROR,
	RECEIVE_COMMAND_END
} = require('../actions/commandsActions');

const initialState = {
	output: List()
};

module.exports = function commands(state = initialState, action) {
	switch (action.type) {
		case REQUEST_COMMAND:
			state.output = state.output.push(action.command);
			return state;

		case RECEIVE_COMMAND_OUTPUT:
			state.output = state.output.push(action.command);
			return state;

		case RECEIVE_COMMAND_ERROR:
			state.output = state.output.push(action.error);
			return state;

		case RECEIVE_COMMAND_END:
			state.output = state.output.push(`Process exited with ${action.exitCode}`);
			return state;

		default:
			return state;
	}
};