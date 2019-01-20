exports.ClientOpts = {
	botToken: null,
	botID: null,
	cache: false,
};

exports.FetchOpts = {
	botToken: null,
	cache: false,
	raw: false,
};

exports.MultiFetchOpts = {
	...exports.FetchOpts,
	mapify: true,
};

exports.PostOpts = {
	botToken: null,
	guildCount: null,
};