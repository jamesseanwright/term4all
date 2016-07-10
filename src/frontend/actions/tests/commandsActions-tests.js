'use strict';

const commandsActions = require('../commandsActions');
const CommandClient = require('../../clients/CommandClient');

describe('the command actions', function () {
	describe('the runCommand method', function () {
		let mockCommandClient;
		let mockCommandsActions;

		beforeEach(function () {
			mockCommandClient = sinon.mock(CommandClient.prototype);
			mockCommandsActions = sinon.mock(commandsActions);
		});

		afterEach(function () {
			mockCommandClient.restore();
			mockCommandsActions.restore();
		});
		
		it('should dispatch the requestCommand action creator and run the command', function () {
			const command = 'ls';
			const dispatch = () => {};
			
			mockCommandsActions.expects('_requestCommand')
							  .once()
							  .withArgs(command);

			mockCommandClient.expects('on')
							 .withArgs('output', sinon.match.func)
							 .once();

			mockCommandClient.expects('on')
							 .withArgs('error', sinon.match.func)
							 .once();

			mockCommandClient.expects('on')
							 .withArgs('end', sinon.match.func)
							 .once();

			mockCommandClient.expects('begin')
							 .withArgs(command)
							 .once();

			const thunk = commandsActions.runCommand(command);
			thunk(dispatch);
			mockCommandsActions.verify();
			mockCommandClient.verify();
		});
	});
});