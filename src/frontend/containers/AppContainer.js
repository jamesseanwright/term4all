'use strict';

const App = require('../components/App/index.jsx');
const { connect } = require('react-redux');
const commandsActions = require('../actions/commandsActions');

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