module.exports = (options) => {
	if (options.botToken !== null && typeof options.botToken !== 'string') throw new TypeError('options.botToken must be a string.');
	else if (options.botID !== null && typeof options.botID !== 'string') throw new TypeError('options.botID must be a string.');
	else return options;
};