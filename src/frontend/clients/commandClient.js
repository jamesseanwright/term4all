'use strict';

/* THIS IS NO LONGER OPTIMAL!
 * Since this is intended to be a singleton
 * used across the codebase, this pattern can
 * result in race conditions. Tech debt raised
 * to update this:
 * https://github.com/jamesseanwright/term4all/issues/1
 */

const EventEmitter = require('events');

function CommandClient() {
	this.webSocket = new WebSocket('ws://localhost:9002');
	this.webSocket.onmessage = message => this.onMessage(JSON.parse(message.data));	
}

CommandClient.prototype = Object.create(EventEmitter.prototype);

CommandClient.prototype.begin = function begin(command) {
	if (this.webSocket.readyState === WebSocket.CONNECTING) {
		this.webSocket.onopen = () => {
			this.webSocket.send(JSON.stringify({ command }));
		}
	}

	this.webSocket.send(JSON.stringify({ command }));	
};

CommandClient.prototype.onMessage = function onMessage(message) {

	switch (Object.keys(message)[0]) {
		case 'output':
			this.emit('output', message.output);
			break;

		case 'error':
			this.emit('error', message.error);
			break;

		case 'currentDirectory':
			this.emit('currentDirectory', message.currentDirectory);

		case 'exitCode':
			this.emit('exitCode', message.exitCode);

			this.removeAllListeners('output');
			this.removeAllListeners('error');
			this.removeAllListeners('exitCode');
			this.removeAllListeners('currentDirectory');

			break;

		default:
			this.emit('error', 'unrecognised message type');
	}
};

module.exports = new CommandClient();