'use strict';

const React = require('react');
const { connect } = require('react-redux');
const commandsActions = require('../actions/commandsActions');

function App(props) {
	const { output, runCommand } = props;
	const outputChildren = output.map(o => <li key={o.id} className="output__item">{o.value}</li>); 

	return (
		<div>
			<ul className="output">
				{outputChildren}
			</ul>
			<input type="text" onKeyUp={runCommand} />
		</div>
	);
};

function mapStateToProps(state) {
	return {
		output: state.commands
	};
}

function mapDispatchToProps(dispatch) {
	return {
		runCommand(e) {
			if (e.key !== 'Enter') return;

			dispatch(commandsActions.runCommand(e.target.value));
			e.target.value = '';			
		}
	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);