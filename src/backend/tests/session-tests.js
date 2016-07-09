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

	describe('the start method', function () {
		const webSocket = {
			send() {},
			on() {}
		};

		let mockSocket;
		let mockRunner;

		beforeEach(function () {
			mockRunner = sinon.mock(CommandRunner.prototype);
			mockSocket = sinon.mock(webSocket);
		});

		afterEach(function () {
			mockRunner.restore();
			mockSocket.restore();

			if (session._parseMessage.restore) {
				session._parseMessage.restore();
			}
		});

		it('should register to the CommandRunner`s and WebSocket`s events', function () {
			mockRunner.expects('on')
					  .withArgs('output', sinon.match.func)
					  .onFirstCall();

			mockRunner.expects('on')
					  .withArgs('error', sinon.match.func)
					  .onSecondCall();

			mockRunner.expects('on')
					  .withArgs('end', sinon.match.func)
					  .onThirdCall();

			mockSocket.expects('on')
					  .once()
					  .withArgs('message', sinon.match.func);

			session.start(webSocket);

			mockRunner.verify();
			mockSocket.verify();
		});

		it('should run the requested command when the WebSocket receives a message', function () {
			const command = 'ls';
			
			mockRunner.expects('on')
					  .thrice();

			mockRunner.expects('run')
					  .once()
					  .withArgs({ command });

			sinon.stub(session, '_parseMessage')
				 .returns(command);

			mockSocket.expects('on')
					  .once()
					  .callsArg(1);

			session.start(webSocket);

			mockRunner.verify();
			mockSocket.verify();
		});

		it('should send process output to the frontend', function () {
			const data = 'data';
			const exitCode = 0;
			const error = 'ls - cannot read ~/foo';
			
			mockRunner.expects('on')
					  .withArgs('output', sinon.match.func)
					  .callsArgWith(1, data);

			mockRunner.expects('on')
					  .withArgs('error', sinon.match.func)
					  .callsArgWith(1, error);

			mockRunner.expects('on')
					  .withArgs('end', sinon.match.func)
					  .callsArgWith(1, exitCode);

			mockSocket.expects('on')
					  .once();

			mockSocket.expects('send')
					  .withArgs(`{"output":"${data}"}`)
					  .once();

			mockSocket.expects('send')
					  .withArgs(`{"error":"${error}"}`)
					  .once();

			mockSocket.expects('send')
					  .withArgs(`{"exitCode":${exitCode}}`)
					  .once();

			session.start(webSocket);

			mockSocket.verify();
			mockRunner.verify();
		});

		it('should send an error message to the frontend if the command payload is invalid', function () {
			const command = 'ls';
			
			mockRunner.expects('on')
					  .thrice();

			sinon.stub(session, '_parseMessage')
				 .returns(null);

			mockSocket.expects('on')
					  .once()
					  .callsArg(1);

			mockSocket.expects('send')
					  .withArgs('{"error":"Invalid payload"}')
					  .onFirstCall();

			mockSocket.expects('send')
					  .withArgs('{"exitCode":-1}')
					  .onSecondCall();

			session.start(webSocket);

			mockRunner.verify();
			mockSocket.verify();
		});
	});
});