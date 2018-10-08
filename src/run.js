const snekfetch = require('snekfetch');
const apiLink = 'https://botsfordiscord.com/api';

class BfdSimpleApi {
    static get link() {
        return apiLink;
    }
    /**
     * Initializes the API wrapper.
     * @class Client
     * @param {String=} token Your API token from the site. This is required to perform POST functions.
     * @param {String=} botID Your Bot ID. Needed for self-short-cut functions.
     * @param {Object=} client Kinda useless right now. Just insert undefined.
     * @param {Boolean=} log If you want to log every POST action with a presupplied message.
     */
    constructor(token = 'none', botID = 'none', client = undefined, log = false) {
        if ([token, botID].some(v => typeof v !== 'string')) throw new TypeError('Both the API Token and Bot ID must be a string.');
        if (typeof log !== 'boolean') throw new TypeError('log must be a boolean value! (true or false)');
        this.token = token === 'none' ? false : token;
        this.id = botID === 'none' ? false : botID;
        this.log = log;
        this.client = client ? client : false;
    }

    /**
     * Post your server count to your bot. Bot ID is supplied ID from initialization.
     * @param {Number=} serverSize The server count to supply. If you supply a valid client on initialization, supplying this value is unnecessary; Supplying a value overrides the auto value set.
     * @returns {Promise<Object>} Returns a message.
     */

    setCount(serverSize) {
        if (!this.token) throw new ReferenceError('To post your server count, you must supply an API token on initialization.');
        if (!serverSize && !this.client) throw new ReferenceError('serverSize must be supplied; Not needed if you supply a valid client on initialization.');
        if (this.client && !serverSize) serverSize = this.client.guilds.size;
        if (typeof serverSize !== 'number') throw new TypeError('serverSize must be a number.');
        const data = {
            server_count: serverSize
        };
        return new Promise((resolve, reject) => {
            snekfetch.post(`${apiLink}/bot/${this.id}`)
                .send(data)
                .set({ Authorization: this.token, 'Content-Type': 'application/json' })
                .then((body) => {
                    if (this.log) console.log(`Successfully posted guild count onto the site, at ${serverSize} guilds to Bot ID ${this.id}`);
                    resolve(body.body);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a bot from the list.
     * @param {String} botID The bot ID to fetch
     * @param {String=} specified Only supply if you want to get a specific value, etc. "verified" or "name" (Disclaimer: This does not detect non-existant values)
     * @returns {Promise<*>} Returns the fetched bot data.
     */

    fetchBot(botID, specified) {
        if (!botID) throw new ReferenceError('The bot ID must be supplied.');
        if (typeof botID !== 'string') throw new TypeError('The bot ID must be a string.');
        if (botID.length !== 18) throw new SyntaxError('The bot ID must be exactly an 18-digit number-string thing');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/bot/${botID}`)
                .then(response => {
                    resolve(specified ? response.body[specified] : response.body);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a bot using the ID supplied on initialization.
     * @param {String=} specified Only supply if you want to get a specific value, etc. "verified" or "name" (Disclaimer: This does not detect non-existant values)
     * @returns {Promise<*>} Returns the fetched bot data.
     */

    fetchSelf(specified) {
        if (!this.id) throw new ReferenceError('The botID must be supplied on initialization.');
        return new Promise((resolve, reject) => {
            this.fetchBot(this.id, specified ? specified : undefined)
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * Check if a bot is verified. Shorthand convenience function for this.fetchBot(botID, 'verified')
     * @param {String} id I guess if you wanted to check if a bot was verified...you could use this...
     * @returns {Promise<Boolean>} Returns true or false, depending if the bot is verified or not.
     */

    checkVerif(botID) {
        if (!botID) throw new ReferenceError('The bot ID must be supplied.');
        if (typeof botID !== 'string') throw new TypeError('The bot ID must be a string.');
        if (botID.length !== 18) throw new SyntaxError('The bot ID must be exactly an 18-digit number-string thing');
        return new Promise((resolve, reject) => {
            this.fetchBot(botID, 'verified')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * Check if your own bot is verified. Shorthand convenience function for this.fetchSelf('verified')
     * @returns {Promise<Boolean>} Returns true or false, depending if the bot is verified or not.
     */

    checkVerifSelf() {
        if (!this.id) throw new ReferenceError('The botID must be supplied on initialization.');
        return new Promise((resolve, reject) => {
            this.fetchSelf('verified')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * Fetch a user that has logged on to the list.
     * @param {String} userID The user ID to fetch.
     * @param {String=} specified A specific thing to get, like
     * @returns {Promise<*>} Returns the user data.
     */
    fetchUser(userID, specified) {
        if (!userID) throw new ReferenceError('The user ID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('The user ID must be a string.');
        if (userID.length !== 18) throw new SyntaxError('The user ID must be exactly an 18-digit number-string thing');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/user/${userID}`)
                .then(response => {
                    resolve(specified ? response.body[specified] : response.body);
                })
                .catch(reject);
        });
    }
    /**
     * Change a value of the object.
     * @param {String} key Whatever to change. (Case-Sensitive)
     * @param {*} value Whatever value to edit. (If value is 'none', it changes to false.)
     * @returns {this} Returns the object.
     */
    edit(key, value) {
        if (!key || !value) throw new ReferenceError('Both key and value must be present.');
        if (!['token', 'id', 'client', 'log'].some(valid => key === valid)) throw new ReferenceError('That key is non-existant.');
        if (['token', 'id'].some(valid => key === valid) && typeof value !== 'string') throw new TypeError(`${key} must be a string.`);
        if (key === 'log' && typeof value !== 'boolean') throw new TypeError(`${key} must be a boolean value.`);
        this[key] = value === 'none' ? false : value;
        return this;
    }

    /**
     * Fetch a widget of a bot on the list.
     *
     * Note that there is currently no widgets on the site, so this function is unusable.
     * @param {String} botID The bot ID to fetch.
     * @param {ObjectConstructor=} size The specific sizes, like height or width.
     */

    /* eslint no-unused-vars: 0 */

    fetchWidget(botID, size) {
        console.warn('There is no widget existing at the moment. This will be updated as soon as possible when they are released.');
    }
}

module.exports = BfdSimpleApi;