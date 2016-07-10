'use strict';

const App = require('../index.jsx');

describe('the App component', function () {
	it('should render a list of commands and their output', function () {
		const props = {
			output: [
				{
					id: 1,
					value: 'ls ~'
				},

				{
					id: 2,
					value: 'Documents'
				}
			],

			runCommand() {}
		};
		
		return renderComponent(App, props).then(element => {
			const listItems = element.querySelectorAll('.terminal__output .output__item');

			console.log(element.innerHTML);
		});
	});
});