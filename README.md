# Term4All

![Screencap](https://raw.githubusercontent.com/jamesseanwright/term4all/master/screencap.gif)

A JavaScript terminal emulator developed using Node.js, WebSockets, React, Redux, and Electron.

## Why Another Terminal Emulator?

* It's a fun self-learning project
* To provide developers working on Windows and Linux with a nicer way of using the command line, akin to iTerm2 for OS X

## Features To Be Implemented

[ ] Shell basics (directory navigation, `.bashrc` etc.)
[ ] Split panes
[ ] Tabs
[ ] Keyboard shortcuts
[ ] Autocomplete

## Local Development

* Install Node.js 6
* `git clone https://github.com/jamesseanwright/term4all.git`
* `cd term4all`
* `npm i`
* `npm run dev`

### Scripts

* `npm run build` - outputs the distributable code to the `dist` dir
* `npm run dev` - runs the build script and runs the server
* `npm run electron` - runs the build script and runs the terminal as an Electron app
