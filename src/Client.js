const Bot = require('./structures/Bot.js');
const { ClientOpts, FetchOpts } = require('./structures/options.js');

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
		if (i.status !== 200) throw new Error();
		return await i.json();
	}

	edit(options, preset = false) {
		const use = preset ? ClientOpts : this.options;
		const o = check(Object.assign(use, options));

		FetchOpts.cache = o.cache;
		FetchOpts.botToken = o.botToken;

		return this.options = o;
	}

	/**
	 * @param {string} [id]
	 * @param {FetchOptions} [options]
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
}

module.exports = Client;