'use strict';

const CommandRunner = require('../CommandRunner');

describe('the command runner', function () {
	describe('the _parseCommand method', function () {
		it('should return an object containing the command name and an array of args', function () {
			const command = 'vim one two three';

			const expectedResult = {
				commandName: 'vim',
				args: ['one', 'two', 'three']
			};

			const actualResult = CommandRunner.prototype._parseCommand(command);
			expect(actualResult).to.deep.equal(expectedResult);
		});

		it('should return an empty args array when no args are specified', function () {
			const command = 'vim';

			const expectedResult = {
				commandName: 'vim',
				args: []
			};

			const actualResult = CommandRunner.prototype._parseCommand(command);
			expect(actualResult).to.deep.equal(expectedResult);
		});
	});
});