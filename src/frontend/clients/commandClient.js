'use strict';

const EventEmitter = require('events');

function CommandClient() {
	this.webSocket = new WebSocket('ws://localhost:9002');
}

CommandClient.prototype = Object.create(EventEmitter.prototype);

CommandClient.prototype.begin = function begin(command) {
	this.webSocket.onmessage = message => this.onMessage(message.data);

	this.webSocket.send(JSON.stringify({ command }));
};

CommandClient.prototype.onMessage = function onMessage(data) {
	/* A bit crappy, but payloads only ever have one prop
	 * could also do dynamic lookup based upon the one
	 * prop, but I'd rather be explicit. */
	
	switch (Object.keys(data)[0]) {
		case 'message':
			this.emit('message', data.message);

		case 'error':
			this.emit('error', data.error);

		case 'exitCode':
			this.emit('exitCode', data.exitCode);

		default:
			this.emit('error', 'unrecognised message type');
	}
};

module.exports = new CommandClient();