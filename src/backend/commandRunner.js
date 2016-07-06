'use strict';

const EventEmitter = require('events');
const spawn = require('child_process').spawn;

function CommandRunner() {
	this.shell = '/bin/sh';
}

CommandRunner.prototype = Object.create(EventEmitter.prototype);

CommandRunner.prototype.begin = function begin(command) {
	const commandParts = command.split(' ');
	const commandName = commandParts[0];
	const args = commandParts.slice(1, commandParts.length);

	const childProcess = spawn(commandName, args);

	childProcess.stdout.on('data', data => this.emit('output', data.toString()));
	childProcess.stderr.on('data', error => this.emit('error', error.toString()));
	childProcess.on('close', exitCode => this.emit('end', exitCode.toString()));
};

module.exports = new CommandRunner();