'use strict';

const EventEmitter = require('events');

function CommandClient() {
	this.webSocket = new WebSocket('ws://localhost:9002');
	this.webSocket.onmessage = message => this.onMessage(JSON.parse(message.data));	
}

CommandClient.prototype = Object.create(EventEmitter.prototype);

CommandClient.prototype.begin = function begin(command) {
	this.webSocket.send(JSON.stringify({ command }));
};

CommandClient.prototype.onMessage = function onMessage(message) {
	/* A bit crappy, but payloads only ever have one prop
	 * could also do dynamic lookup based upon the one
	 * prop, but I'd rather be explicit. */

	switch (Object.keys(message)[0]) {
		case 'output':
			this.emit('output', message.output);
			break;

		case 'error':
			this.emit('error', message.error);
			break;

		case 'exitCode':
			this.emit('exitCode', message.exitCode);

			/* While EventEmitter.prototype.once
			 * could be used, this isn't ideal for
			 * stdout and stderr data as the user might be interacting
			 * with a long-running process, like a CLI. Thus, for
			 * consistency, all other listeners are removed once exit
			 * code is received */
			this.removeAllListeners('output');
			this.removeAllListeners('error');
			this.removeAllListeners('exitCode');

			break;

		default:
			this.emit('error', 'unrecognised message type');
	}
};

module.exports = new CommandClient();