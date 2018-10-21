const Base = require('./bases/Base').Base;
const FetchOptions = require('./FetchOptions.js').FetchOptions;
const User = require('./User.js');

/**
 * Represents a bot on the site.
 * @class
 * @extends {Base}
 */
class Bot extends Base {
    /**
     * @constructor
     * @param {Object} bot The plain bot object that was fetched from the API.
     */
    constructor(bot) {
        super(bot);
        /**
         * The plain bot object itself.
         * @type {Object}
         */
        this.bot = bot;
        /**
         * Whether or not the bot is approved.
         * @type {Boolean}
         */
        this.isApproved = bot.approved;
        /**
         * The bot's ID.
         * @type {String}
         */
        this.id = bot.id;
        /**
         * The bot's clientID, if any.
         * @type {?String}
         */
        this.clientID = bot.clientId || null;
        /**
         * Whether or not the bot is featured on the front page.
         * @type {Boolean}
         */
        this.isFeatured = bot.featured;
        /**
         * The bot's library.
         * @type {String}
         */
        this.library = bot.library;
        /**
         * Whether or not the bot is verified on the site.
         * @type {Boolean}
         */
        this.isVerified = bot.verified;
        /**
         * Whether or not the bot is a bot FOR the site.
         * @type {Boolean}
         */
        this.isWebsiteBot = bot.website_bot;
        /**
         * The bot's long/detailed description.
         * @type {String}
         */
        this.longDescription = bot.long_desc;
        /**
         * The bot's short description.
         * @type {String}
         */
        this.shortDescription = bot.short_desc;
        /**
         * The bot's server count, if any.
         * @type {?Number}
         */
        this.serverCount = bot.server_count || null;
        /**
         * The bot's prefix.
         * @type {String}
         */
        this.prefix = bot.prefix;
        /**
         * The bot's github repository, if any.
         * @type {?String}
         */
        this.github = bot.github || null;
    }

    /**
     * Retrieves the invite URL of the bot.
     * @param {Boolean} perms Whether or not to include permissions in the invite.
     * @returns {String} The bot's invite URL.
     */
    invite(perms = true) {
        return !perms ? this.bot.invite.replace(/&permissions=[0-9]*/gi, '') : this.bot.invite;
    }

    /**
     * Retrieves the bot's support server invite.
     * @param {Boolean} code Whether or not to only retrieve the invite code part of the URL.
     * @returns {String} The support server's invite URL or code, if any.
     */
    support(code = false) {
        if (!this.bot.support_server) return null;
        return code ? this.bot.support_server.replace(/(https|http):\/\/discord\.gg\//, '') : this.bot.support_server;
    }

    /**
     * Fetches all of the bot's owners, including the secondary ones.
     * @param {FetchOptions} options Fetch Options.
     * @returns {Array<User>} An array of the bot's owners.
     * @example
     * Bot.owners({ specified: 'username' })
     *  .then(owners => console.log(`The bot owners' usernames are ${owners}`))
     *  .catch(console.error);
     */
    owners(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            const owners = this.bot.owners.push(this.bot.owner);
            return Options.specified ? owners.map(owner => owner[Options.specified]) : owners;
        } else {
            const owners = this.bot.owners.push(this.bot.owner).map(u => new User.User(u));
            return Options.specified ? owners.map(owner => owner[Options.specified]) : owners;
        }
    }
}

exports.Bot = Bot;