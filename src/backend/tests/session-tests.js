'use strict';

const CommandRunner = require('../CommandRunner');
const session = require('../session');

describe('the session abstraction', function () {
	describe('the _parseMessage method', function () {
		it('should parse the message string to JSON and return its command property', function () {
			const message = '{ "command": "ls" }';
			const expectedCommand = 'ls';
			const actualCommand = session._parseMessage(message);
			
			expect(actualCommand).to.equal(expectedCommand);
		});

		it('should return null when the message cannot be parsed', function () {
			const message = '{ "command": "ls"';
			const actualCommand = session._parseMessage(message);
			
			expect(actualCommand).to.equal(null);
		});

		it('should return null when the message has no command property', function () {
			const message = '{ "foo": "bar" }';
			const actualCommand = session._parseMessage(message);
			
			expect(actualCommand).to.equal(null);
		});
	});
});