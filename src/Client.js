const Bot = require('./structures/Bot.js');
const User = require('./structures/User.js');
const FetchError = require('./structures/FetchError.js');
const { ClientOpts, FetchOpts, MultiFetchOpts, PostOpts } = require('./structures/options.js');

const check = require('./util/check.js');
const Store = require('@ired_me/red-store');
const Fetch = require('node-fetch').default;
const endpoint = 'https://botsfordiscord.com/api';

const isObject = (o) => Array.isArray(o) ? false : o === Object(o);

class Client {
	get endpoint() {
		return endpoint;
	}

	/**
	 * @param {ClientOptions} opts
	 */
	constructor(opts = ClientOpts) {
		/**
		 * The ClientOptions of the Client.
		 * @type {ClientOptions}
		 */
		this.options = opts;
		this.edit(opts, true);

		/**
		 * Cached bots, mapped by their ID.
		 * @type {Store}
		 */
		this.bots = new Store();

		/**
		 * Cached users, mapped by their ID.
		 * @type {Store}
		 */
		this.users = new Store();
	}

	async get(point, ...headers) {
		const i = await Fetch(this.endpoint + point + headers.join(''));
		const contents = await i.json();
		if (contents.message) throw new FetchError(i, contents.message);
		else return contents;
	}

	async post(point, Authorization, body) {
		const i = await Fetch(this.endpoint + point, {
			method: 'post',
			headers: { Authorization, 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const contents = await i.json();
		if (contents.message) throw new FetchError(i, contents.message);
		else return contents;
	}

	edit(options, preset = false) {
		const use = preset ? ClientOpts : this.options;
		const o = check(Object.assign(use, options));

		FetchOpts.cache = MultiFetchOpts.cache = o.cache;
		FetchOpts.botToken = MultiFetchOpts.botToken = PostOpts.botToken = o.botToken;

		return this.options = o;
	}

	/**
	 * @param {string} [id=this.options.botID]
	 * @param {FetchOptions} [options={}]
	 * @returns {Bot}
	 */
	async fetchBot(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		}
		const { cache, raw } = Object.assign(FetchOpts, options); // eslint-disable-line

		if (id === null || typeof id === 'undefined') throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/bot/${id}`);
		if (cache) this.bots.set(id, new Bot(contents));
		return raw ? contents : new Bot(contents);
	}

	/**
	 * Fetches the bot IDs of a user.
	 * @param {string} id
	 * @returns {string[]}
	 */
	async fetchBotsOfUser(id) {
		if (typeof id === 'undefined') throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');

		const contents = await this.get(`/user/${id}/bots`);
		if (!Array.isArray(contents.bots)) return [];
		else return contents.bots;
	}

	/**
	 * @param {string} id
	 * @param {FetchOptions} [options={}]
	 * @returns {User}
	 */
	async fetchUser(id, options = {}) {
		const { cache, raw } = Object.assign(FetchOpts, options);

		if (typeof id === 'undefined') throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/user/${id}`);
		if (cache) this.users.set(id, new User(contents));
		return raw ? contents : new User(contents);
	}

	/**
	 * Posts guild count to a bot.
	 * @param {string | number | PostOptions} [id=this.options.botID] The ID of the Bot to post guild count of.
	 * * This can also be {@link PostOptions} if `this.options.botID` is defined.
	 * * This can also be a number for {@link PostOptions#guildCount} (Requires `this.options.botToken` be present)
	 * @param {PostOptions | number} [options={}] Options to pass.
	 * * This can also be a number for {@link PostOptions#guildCount} (Requires `this.options.botToken` be present)
	 * @returns {object}
	 */
	async postCount(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		} else if (typeof id === 'number') {
			options.guildCount = id;
			id = this.options.botID;
		} else if (typeof options === 'number') {
			options = { guildCount: options };
		}
		const { botToken, guildCount } = Object.assign(PostOpts, options);

		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string or a number.');
		if (!botToken) throw new ReferenceError('options.botToken must be present.');
		if (!guildCount) throw new ReferenceError('options.guildCount must be present.');

		return await this.post(`/bot/${id}`, botToken, { server_count: guildCount });
	}
}

module.exports = Client;