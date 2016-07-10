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

			expect(listItems.length).to.equal(2);
			expect(listItems[0].textContent).to.equal('ls ~');
			expect(listItems[1].textContent).to.equal('Documents');
		});
	});
});