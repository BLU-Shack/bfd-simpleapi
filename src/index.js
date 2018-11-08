const Fetch = require('node-fetch');
const util = require('util') // eslint-disable-line
const endpoint = 'https://botsfordiscord.com/api';
const ClientOptions = require('./structures/ClientOptions.js').ClientOptions;
const FetchOptions = require('./structures/FetchOptions.js').FetchOptions;
const Bot = require('./structures/Bot.js').Bot;
const User = require('./structures/User.js').User;
const WidgetFetchOptions = require('./structures/WidgetFetchOptions.js').WidgetFetchOptions;
const WebhookPostOptions = require('./structures/WebhookPostOptions.js').WebhookPostOptions;
const PostOptions = require('./structures/PostOptions.js').PostOptions;

const warn = require('./util/warn.js').warn;

class Client {
    /**
     * Initializes the API wrapper.
     * @param {ClientOptions} [options=ClientOptions.default] Client Options.
     */
    constructor(options = ClientOptions.default) {
        /**
         * @ignore
         * @type {ClientOptions}
         */
        this.options;
        this.edit(options, true); // Note from the Developer: DO NOT TOUCH!!!!!!!
    }

    /**
     * By the way, if you are reading this, this won't run if you have options.log disabled.
     * @param {*} message The message to console log.
     * @private
     */
    _log(message) {
        if (this.options.log) console.log(message);
    }

    /**
     * Outputs red text in the console. Kool stuff.
     * @param {*} message The message to console log as RED.
     * @private
     */
    _warn(message) {
        warn(message);
    }

    /**
     * Change a value of the object.
     * @param {ClientOptions} [options={}] Client Options for change.
     * @param {Boolean} [preset=false] Whether or not to have preset options.
     * @returns {this}
     * @example
     * console.log(Client.edit({ log: false }));
     */
    edit(options = ClientOptions.default, preset = false) {
        if (!options) throw new ReferenceError('options must be defined.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        if (options.token && typeof options.token !== 'string') throw new TypeError('options.token must be a string.');
        if (options.botID && typeof options.botID !== 'string') throw new TypeError('options.botID must be a string.');
        if (options.log && typeof options.log !== 'boolean') throw new TypeError('options.log must be a boolean value.');

        this.options = new ClientOptions(options, preset ? ClientOptions.default : this.options);

        return this;
    }

    /**
     * Post your server count to your bot. Bot ID is supplied ID from initialization.
     * @param {PostOptions} [options={}] Post Options.
     * @returns {Promise<Object>} Returns a message.
     */
    setGuilds(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new PostOptions(options, this.options);
        if (!Options.token) throw new ReferenceError('POSTing server count requires a token to be set.');
        if (!Options.botID) throw new ReferenceError('POSTing server count requires a bot ID to be set.');
        if (!Options.guildCount) throw new ReferenceError('options.guildCount must be supplied; Not needed if you supply a valid client on initialization.');
        if (typeof Options.guildCount !== 'number') throw new TypeError('options.guildCount must be a number.');
        const size = { server_count: Options.guildCount };
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bot/${Options.botID}`, { method: 'POST', headers: { Authorization: Options.token, 'Content-Type': 'application/json' }, body: JSON.stringify(size) })
                .then(async body => {
                    const resolved = await body.json();
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a bot from the list.
     * @param {String} botID The bot ID to fetch
     * @param {FetchOptions} [options={}] Only supply if you want to get a specific value, etc. "verified" or "name" (Disclaimer: This does not detect non-existant values)
     * @returns {Promise<Bot>} Returns the fetched bot data.
     */
    fetchBot(botID, options = {}) {
        if (!botID) throw new ReferenceError('The bot ID must be supplied.');
        if (typeof botID !== 'string') throw new TypeError('The bot ID must be a string.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bot/${botID}`)
                .then(async response => {
                    const Body = await response.json();
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        const resolved = Options.specified ? Body[Options.specified] : Body;
                        this._log(resolved);
                        resolve(resolved);
                    } else {
                        const BfdBot = Options.stringify ? new Bot(Body).toString() : new Bot(Body);
                        const resolved = Options.specified ? BfdBot[Options.specified] : BfdBot;
                        this._log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a bot using the ID supplied on initialization.
     * @param {FetchOptions} [options={}] Only supply if you want to get a specific value, etc. "verified" or "name" (Disclaimer: This does not detect non-existant values)
     * @returns {Promise<Bot>} Returns the fetched bot data.
     */
    fetchSelf(options = {}) {
        if (!this.options.botID) throw new ReferenceError('ClientOptions.botID is non-existent.');
        return this.fetchBot(this.options.botID, options);
    }

    /**
     * Fetch a user that has logged on to the list.
     * @param {String} userID The user ID to fetch.
     * @param {FetchOptions} [options={}] A specific thing to get, like
     * @returns {Promise<User>} Returns the user data.
     * @example
     * Client.fetchUser('235593018332282884')
     *  .then(user => console.log(user.username))
     *  .catch(console.error);
     */
    fetchUser(userID, options = {}) {
        if (!userID) throw new ReferenceError('The user ID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('The user ID must be a string.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/user/${userID}`)
                .then(async response => {
                    const Body = await response.json();
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        const resolved = Options.specified ? Body[Options.specified] : Body;
                        this._log(resolved);
                        resolve(resolved);
                    } else {
                        const BfdUser = Options.stringify ? new User(Body).toString() : new User(Body);
                        const resolved = Options.specified ? BfdUser[Options.specified] : BfdUser;
                        this._log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetches the bot IDs the user owns.
     * @param {String} userID The user ID to get their bots from.
     * @returns {Promise<Array<String>>} An array of the bot IDs the user owns.
     */
    fetchUserBots(userID) {
        if (!userID) throw new ReferenceError('userID must be defined.');
        if (typeof userID !== 'string') throw new TypeError('userID must be a string.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/user/${userID}/bots`)
                .then(async body => {
                    const Obj = await body.json();
                    const Bots = Obj.bots;
                    this._log(Bots);
                    resolve(Bots);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a widget of a bot on the list.
     * @param {String} botID The bot ID to fetch.
     * @param {WidgetFetchOptions} options Widget Fetch Options.
     * @returns {Promise<Buffer>} The widget buffer.
     * @example
     * const fs = require('fs');
     *
     * Client.fetchWidget('463803888072523797')
     *  .then(widget => fs.writeFileSync('widget.jpeg', widget))
     *  .catch(console.error);
     */
    fetchWidget(botID, options = {}) {
        if (!botID) throw new ReferenceError('botID must be provided.');
        if (typeof botID !== 'string') throw new TypeError('botID must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            const Options = new WidgetFetchOptions(options);
            if (Options.width < 400 || Options.height < 180) this._warn('Any widgets with a size smaller than 400x180 may be distorted to an unknown level.');
            Fetch(`${endpoint}/bot/${botID}/widget${Options.width}${Options.height}`)
                .then(async widget => {
                    const Body = await widget.buffer();
                    this._log(Body);
                    resolve(Body);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch the widget of the self bot.
     * @param {WidgetFetchOptions} options Widget Fetch Options
     * @returns {Promise<Buffer>} The widget buffer.
     */
    fetchWidgetSelf(options = {}) {
        if (!this.options.botID) throw new ReferenceError('ClientOptions.botID is non-existent.');
        return this.fetchWidget(this.options.botID, options);
    }

    /**
     * Check if a bot is verified. Shorthand convenience function for this.fetchBot(botID, 'verified')
     * @param {String} botID I guess if you wanted to check if a bot was verified...you could use this...
     * @returns {Promise<Boolean>} Returns true or false, depending if the bot is verified or not.
     */
    isVerified(botID) {
        if (!botID) throw new ReferenceError('The options.botID must be supplied.');
        if (typeof botID !== 'string') throw new TypeError('The bot ID must be a string.');
        return new Promise((resolve, reject) => {
            this.fetchBot(botID, { specified: 'isVerified' })
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * Check if your own bot is verified.
     * @returns {Promise<Boolean>} Returns true or false, depending if the bot is verified or not.
     */
    isVerifiedSelf() {
        if (!this.options.botID) throw new ReferenceError('The options.botID must be supplied.');
        return new Promise((resolve, reject) => {
            this.isVerified(this.options.botID)
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * Tests posting to a webhook.
     * @param {WebhookPostOptions} options Webhook Post Options.
     * @returns {Object} An object containing an example.
     */
    postWebhook(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new WebhookPostOptions(options);
        return new Promise((resolve, reject) => {
            const data = { user: Options.userID, bot: Options.botID, votes: Options.votes };
            Fetch(`${endpoint}/webhooktest`, { method: 'POST', headers: { Authorization: this.options.token }, body: JSON.stringify(data) })
                .then(async body => {
                    const webhook = await body.json();
                    resolve(webhook);
                })
                .catch(reject);
        });
    }

    /**
     * The Base URL for interacting with the site.
     * @returns {String} The Base URL.
     * @static
     */
    static get endpoint() {
        return endpoint;
    }

    /**
     * All of the Classes used.
     * @static
     */
    static get Classes() {
        return { Bot, ClientOptions, FetchOptions, PostOptions, User, WebhookPostOptions, WidgetFetchOptions };
    }
}

module.exports = Client;