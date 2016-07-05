'use strict';

const commandRunner = require('./commandRunner');

function parseMessage(message) {
	let parsedMessage;

	try {
		JSON.parse(message);
	} catch (e) {
		return null;
	}

	return parsedMessage.command ? parsedMessage.command : null;
}

module.exports = function startSession(websocket) {
	websocket.on('message', function onMessage(message) {
		const command = parseMessage(message);

		if (!command) {
			websocket.send({ error: 'Invalid payload' });
		}

		commandRunner.begin(command);

		commandRunner.on('message', message => websocket.send(JSON.stringify({ message })));
		commandRunner.on('error', error => websocket.send(JSON.stringify({ error })));
		commandRunner.on('end', exitCode => websocket.send(JSON.stringify({ exitCode })));
	});
};