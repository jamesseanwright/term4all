'use strict';

const PORT = 9001;
const WEBSOCKET_PORT = 9002;

const http = require('http');
const express = require('express');
const { Server } = require('ws');
const startSession = require('./startSession');
const webSocketServer = new Server({ port: WEBSOCKET_PORT });
const assets = express();
const assetsServer = http.createServer(assets);

assets.use('/', express.static(__dirname + '/../frontend'));

assetsServer.listen(PORT, () => {
	console.log(`Assets server running on port ${PORT}...`);
});

console.log('Awaiting WebSocket connection...');

webSocketServer.on('connection', startSession);

process.on('SIGTERM', () => {
	assetsServer.close(() => {
		process.exit(0);
	});
});