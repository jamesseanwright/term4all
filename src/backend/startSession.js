'use strict';

const commandRunner = require('./commandRunner');

function parseMessage(message) {
	let parsedMessage;

	try {
		parsedMessage = JSON.parse(message);
	} catch (e) {
		return null;
	}

	return parsedMessage.command ? parsedMessage.command : null;
}

module.exports = function startSession(websocket) {
	console.log('WebSocket connection established!');

	websocket.on('message', function onMessage(message) {
		const command = parseMessage(message);

		if (!command) {
			websocket.send({ error: 'Invalid payload' });
		}

		commandRunner.begin(command);

		commandRunner.on('output', output => websocket.send(JSON.stringify({ output })));
		commandRunner.on('error', error => websocket.send(JSON.stringify({ error })));
		commandRunner.on('end', exitCode => websocket.send(JSON.stringify({ exitCode })));
	});
};