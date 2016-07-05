'use strict';

module.exports = function commandValidator(req, res, next) {
	if (!req.body.command) {
		res.status(400).json({ error: 'command parameter is missing'});
		return;
	}

	next();
};