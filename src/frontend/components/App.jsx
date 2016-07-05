'use strict';

const React = require('react');
const { connect } = require('react-redux');

function App(props) {
	const { output } = props;
	const outputChildren = output.map(o => <li className="output__item">o</li>); 

	return (
		<div>
			<ul className="output">
				{outputChildren}
			</ul>
			<input type="text" value="Command pls" />
		</div>
	);
};

function mapStateToProps(state) {
	return {
		output: state.commands.output
	};
}

module.exports = connect(mapStateToProps)(App);