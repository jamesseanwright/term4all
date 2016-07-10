'use strict';

const sinon = require('sinon');
const { expect } = require('chai');

global.sinon = sinon;
global.expect = expect;

// for frontend JSX tests
require('babel-register')({
	extensions: ['.jsx'],
	presets: ['react']
});

// browser shim
global.WebSocket = function WebSocket() {}