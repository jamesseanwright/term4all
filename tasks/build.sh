#!/usr/bin/env bash

if [ ! -d dist ]
then
	mkdir dist
else
	rm -rf dist/*
fi

mkdir dist/frontend
node_modules/.bin/browserify src/frontend/index.jsx --debug --outfile dist/frontend/index.js --transform [ babelify --presets [ react ] ]
cp src/frontend/index.html dist/frontend
cp -R src/backend dist/backend
