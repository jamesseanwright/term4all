'use strict';

const commandClient = require('../clients/commandClient');

module.exports = { 
	REQUEST_COMMAND: 'REQUEST_COMMAND',
	RECEIVE_COMMAND_OUTPUT: 'RECEIVE_COMMAND_OUTPUT',
	RECEIVE_COMMAND_ERROR: 'RECEIVE_COMMAND_ERROR',	
	RECEIVE_COMMAND_END: 'RECEIVE_COMMAND_END',

	_requestCommand(command) {
		return {
			type: this.REQUEST_COMMAND,
			command
		};
	},

	_receiveCommandOutput(output) {
		return {
			type: this.RECEIVE_COMMAND_OUTPUT,
			output
		};
	},

	_receiveCommandError(error) {
		return {
			type: this.RECEIVE_COMMAND_ERROR,
			error
		};
	},

	_receiveCommandEnd(exitCode) {
		return {
			type: this.RECEIVE_COMMAND_END,
			exitCode
		};
	},

	runCommand(command) {
		return (dispatch, getState) => {
			dispatch(this._requestCommand(command));

			commandClient.on('output', output => dispatch(this._receiveCommandOutput(output)));
			commandClient.on('error', error => dispatch(this._receiveCommandError(error)));
			commandClient.on('end', exitCode => dispatch(this._receiveCommandEnd(exitCode)));
		
			commandClient.begin(command);	
		};
	}
};