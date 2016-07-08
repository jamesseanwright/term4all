'use strict';

const fork = require('child_process').fork;
const electron = require('electron');
const { app, BrowserWindow } = electron;

console.log('Creating backend process...');

const backend = fork(__dirname + '/backend/server');

backend.on('message', m => {
	if (!m.isBackendReady) {
		console.error('Unable to create backend process!');
		process.exit(1);
	}

	console.log('Backend process created!');
	createWindow();
});

function createWindow() {
	let win = new BrowserWindow({ width: 640, height: 480 });
	win.loadURL('http://localhost:9001');
	win.once('ready-to-show', () => win.show());

	win.on('closed', () => {
		backend.kill();		
		win = null;
	});
}