'use strict';

const commandClient = require('../clients/commandClient');

module.exports = { 
	REQUEST_COMMAND: 'REQUEST_COMMAND',
	RECEIVE_COMMAND_OUTPUT: 'RECEIVE_COMMAND_OUTPUT',
	RECEIVE_COMMAND_ERROR: 'RECEIVE_COMMAND_ERROR',	
	RECEIVE_COMMAND_END: 'RECEIVE_COMMAND_END',

	_requestCommand(command) {
		return {
			type: REQUEST_COMMAND,
			command
		};
	},

	_receiveCommandOutput(message) {
		return {
			type: RECEIVE_COMMAND_OUTPUT,
			message
		};
	},

	_receiveCommandError(error) {
		return {
			type: RECEIVE_COMMAND_ERROR,
			error
		};
	},

	_receiveCommandEnd(exitCode) {
		return {
			type: RECEIVE_COMMAND_END,
			exitCode
		};
	},

	runCommand(command) {
		return (dispatch, getState) => {
			return new Promise((resolve, reject) => {
				dispatch(this._requestCommand(command));

				commandClient.begin(command);
				commandClient.on('message', message => dispatch(this._receiveCommandOutput(message)));
				commandClient.on('error', error => dispatch(this._receiveCommandError(error)));
				
				commandClient.on('end', exitCode => {
					dispatch(this._receiveCommandEnd(exitCode));

					if (exitCode > 0) {
						reject();
					} else {
						resolve();
					}
				});
			});
		};
	}
};