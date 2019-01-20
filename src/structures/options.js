/**
 * @typedef {object} ClientOptions Options you can pass upon instantiating the Client.
 * @property {string} [botToken=null] The bot API token from Bots for Discord.
 * @property {string} [botID=null] The Discord ID of a bot.
 * @property {boolean} [cache=false] If true, caches fetched bots/users.
 */
exports.ClientOpts = {
	botToken: null,
	botID: null,
	cache: false,
};

/**
 * @typedef {object} FetchOptions Options you can pass when fetching something.
 * @property {string} [botToken=null] The bot API token from Bots for Discord.
 * @property {boolean} [cache=false] If true, caches fetched bots/users.
 * @property {boolean} [raw=false] If true, returns the raw object in place of its class.
 */
exports.FetchOpts = {
	botToken: null,
	cache: false,
	raw: false,
};

/**
 * @typedef {object} PostOptions Options you can pass when posting server count.
 * @property {string} [botToken=null] The bot API token from Bots for Discord.
 * @property {number} guildCount The number of guilds the bot is in.
 */
exports.PostOpts = {
	botToken: null,
	guildCount: null,
};