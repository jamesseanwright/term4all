'use strict';

const EventEmitter = require('events');
const spawn = require('child_process').spawn;

function CommandRunner() {
	this.shell = true;
}

CommandRunner.prototype = Object.create(EventEmitter.prototype);

CommandRunner.prototype._parseCommand = function parseCommand(command) {
	const commandParts = command.split(' ');
	const commandName = commandParts[0];
	const args = commandParts.slice(1, commandParts.length);

	return { commandName, args };
};

CommandRunner.prototype.begin = function begin(command) {
	const { commandName, args } = this._parseCommand(command);

	const childProcess = spawn(commandName, args, {
		shell: this.shell
	});

	childProcess.stdout.on('data', data => this.emit('output', data.toString()));
	childProcess.stderr.on('data', error => this.emit('error', error.toString()));
	childProcess.on('close', exitCode => this.emit('end', exitCode.toString()));
};

module.exports = CommandRunner;