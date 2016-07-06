'use strict';

const { List } = require('immutable');

const { 
	REQUEST_COMMAND,
	RECEIVE_COMMAND_OUTPUT,
	RECEIVE_COMMAND_ERROR,
	RECEIVE_COMMAND_END
} = require('../actions/commandsActions');

function pushWithId({ state, value }) {
	return state.push({
		id: Date.now() + value.trim(),
		value
	});
}

module.exports = function commands(state = List(), action) {
	switch (action.type) {
		case REQUEST_COMMAND:
			state = pushWithId({ state, value: action.command });
			return state;

		case RECEIVE_COMMAND_OUTPUT:
			state = pushWithId({ state, value: action.output });
			return state;

		case RECEIVE_COMMAND_ERROR:
			state = pushWithId({ state, value: action.error });
			return state;

		case RECEIVE_COMMAND_END:
			state = pushWithId({ state, value: `Process exited with ${action.exitCode}` });
			return state;

		default:
			return state;
	}
};