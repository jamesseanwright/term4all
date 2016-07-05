'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const commandValidator = require('./commandValidator');
const CommandRunner = require('./CommandRunner');
const router = express.Router();
const commandRunner = new CommandRunner();

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
	commandRunner.on('end', exitCode => res.end(`data: ${exitCode}`));
});

module.exports = router;