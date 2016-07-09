'use strict';

const PORT = 9001;
const WEBSOCKET_PORT = 9002;

const http = require('http');
const express = require('express');
const { Server } = require('ws');
const session = require('./session');
const webSocketServer = new Server({ port: WEBSOCKET_PORT });
const assets = express();
const assetsServer = http.createServer(assets);

assets.use('/', express.static(__dirname + '/../frontend'));

assetsServer.listen(PORT, () => {
	console.log(`Frontend running on port ${PORT}...`);

	if (process.send) {
		process.send({ isBackendReady: true });
	}
});

console.log('Awaiting WebSocket connection...');

webSocketServer.on('connection', socket => session.start(socket));

process.on('SIGTERM', () => {
	assetsServer.close(() => {
		process.exit(0);
	});
});