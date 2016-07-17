'use strict';

const spawn = require('child_process').spawn;

module.exports = {
	_spawn({ command, args = [] }) {
		return new Promise((resolve, reject) => {
			let result;
			const process = spawn(command, args);

			process.stdout.on('data', data => result = data.toString());
			process.stderr.on('data', data => result = data.toString());

			process.on('close', exitCode => {
				exitCode > 0 ? resolve(result) : reject(result)
			});
		});
	},

	getInitialAppState() {
		const currentDirectory = process.cwd();
		
		return this._spawn({ command: 'whoami' })
				   .then(user => {
					   return {
						   initialAppState: {
							   currentDirectory,
							   user
						   }
					   };
				   });
	}
};