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

	start(webSocket) {
		console.log('WebSocket connection established!');

		commandRunner.on('output', output => webSocket.send(JSON.stringify({ output })));
		commandRunner.on('error', error => webSocket.send(JSON.stringify({ error })));
		commandRunner.on('end', exitCode => webSocket.send(JSON.stringify({ exitCode })));

		webSocket.on('message', message => {
			const command = this._parseMessage(message);

			if (!command) {
				webSocket.send(JSON.stringify({ error: 'Invalid payload' }));
				webSocket.send(JSON.stringify({ exitCode: -1 }));
				return;
			}

			commandRunner.run({ command });
		});
	}
};