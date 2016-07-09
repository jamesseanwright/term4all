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

	describe('the run method', function () {
		const spawner = {
			spawn() {}
		};

		const eventEmitter = {
			on() {}
		};

		let mockSpawner;
		let mockEmitter;
		let commandRunner;

		beforeEach(function () {
			mockSpawner = sinon.mock(spawner);
			mockEmitter = sinon.mock(eventEmitter);
			commandRunner = new CommandRunner();
		});

		afterEach(function () {
			mockSpawner.restore();
			mockEmitter.restore();
			commandRunner._parseCommand.restore();
		});

		it('should spawn the specified command and register to the process` listeners', function () {
			const command = 'vim'

			sinon.stub(commandRunner, '_parseCommand')
				 .returns({
					 commandName: command,
					 args: []
				 });

			mockEmitter.expects('on')
					   .withArgs('data', sinon.match.func)
					   .onFirstCall();					   

			mockEmitter.expects('on')
					   .withArgs('data', sinon.match.func)
					   .onSecondCall();					   

			mockEmitter.expects('on')
					   .withArgs('close', sinon.match.func)
					   .onThirdCall();	

			const childProcess = {
				stdout: eventEmitter,
				stderr: eventEmitter,
				on: eventEmitter.on
			};

			mockSpawner.expects('spawn')
					   .once()
					   .withArgs(command, [], {
						   shell: true
					   })
					   .returns(childProcess);

			commandRunner.run({ command, _spawn: spawner.spawn });

			mockSpawner.verify();
			mockEmitter.verify();
		});
	});
});