'use strict';

const CommandRunner = require('./CommandRunner');
const commandRunner = new CommandRunner();

module.exports = {
	_parseMessage(message) {
		let parsedMessage;

		try {
			parsedMessage = JSON.parse(message);
		} catch (e) {
			return null;
		}

		return parsedMessage.command ? parsedMessage.command : null;
	},

	start(websocket) {
		console.log('WebSocket connection established!');

		commandRunner.on('output', output => websocket.send(JSON.stringify({ output })));
		commandRunner.on('error', error => websocket.send(JSON.stringify({ error })));
		commandRunner.on('end', exitCode => websocket.send(JSON.stringify({ exitCode })));

		websocket.on('message', function onMessage(message) {
			const command = this.parseMessage(message);

			if (!command) {
				websocket.send(JSON.stringify({ error: 'Invalid payload' }));
				websocket.send(JSON.stringify({ exitCode: -1 }));
				return;
			}

			commandRunner.run({ command });
		});
	}
};