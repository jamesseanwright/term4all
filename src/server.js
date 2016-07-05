'use strict';

const http = require('http');
const express = require('express');
const api = require('./api');
const app = express();
const server = http.createServer(app);

const PORT = 9001;

app.use(express.static(__dirname + '/app'));
app.use('/api', api);

server.listen(PORT, () => {
	console.log(`Backend running on port ${PORT}...`);
});

server.on('SIGTERM', () => {
	server.close(() => {
		process.exit(0);
	});
});