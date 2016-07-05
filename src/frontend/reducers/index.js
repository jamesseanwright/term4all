'use strict';

const { combineReducers } = require('redux');
const commands = require('./commands');

module.exports = combineReducers({
	commands
});