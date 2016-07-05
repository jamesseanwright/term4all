'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const commandValidator = require('./commandValidator');
const commandRunner = require('./commandRunner');
const router = express.Router();

router.use(bodyParser.json());
router.use(commandValidator);

router.post('/command', function runCommand(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});

	commandRunner.begin(req.body.command);

	commandRunner.on('message', message => res.write(`data: ${message}`));
	commandRunner.on('end', message => res.end(`data: ${message}`));
});

module.exports = router;