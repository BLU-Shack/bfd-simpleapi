const Base = require('./Base').Base;
const util = require('util');

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

        Object.defineProperty(this, 'bot', { writable: true, enumerable: false });

        /**
         * The plain bot object itself.
         * @type {Object}
         */
        this.bot = bot;

        /**
         * The bot's background color, if any was set.
         * @type {?String}
         */
        this.backgroundColor = bot.color || null;

        /**
         * The bot's clientID, if any.
         * @type {?String}
         */
        this.clientID = bot.clientId || null;

        /**
        * The bot's github repository, if any.
        * @type {?String}
        */
        this.github = bot.github || null;

        /**
         * The bot's guild count, if any.
         * @type {?Number}
         */
        this.guildCount = bot.server_count || null;

        /**
         * Whether or not the bot allows advertisements to be run on their page.
         * @type {Boolean}
         */
        this.hasAdvertisements = bot.hasAds;

        /**
         * The bot's invite URL.
         * @type {String}
         */
        this.inviteURL = bot.invite;

        /**
         * Whether or not the bot is approved.
         * @type {Boolean}
         */
        this.isApproved = bot.approved;

        /**
         * Whether or not the bot is featured on the front page.
         * @type {Boolean}
         */
        this.isFeatured = bot.featured;

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
         * The bot's library.
         * @type {String}
         */
        this.library = bot.library;

        /**
         * The bot's prefix.
         * @type {String}
         */
        this.prefix = bot.prefix;

        /**
         * Identical to {@link Bot#guildCount}
         * @type {?Number}
         */
        this.serverCount = this.guildCount;

        /**
         * The bot's short description.
         * @type {String}
         */
        this.shortDescription = bot.short_desc;

        /**
         * The bot's support URL, if any.
         * @type {?String}
         */
        this.supportURL = bot.support_server || null;

        /**
         * The bot's primary owner ID.
         * @type {String}
         */
        this.owner = bot.owner;

        /**
         * The bot's secondary owner IDs, if any. Returns an empty array if none.
         * @type {Array<?String>}
         */
        this.secondaryOwners = bot.owners;

        /**
         * All of the bot's owner IDs.
         * @type {Array<String>}
         */
        this.owners = this.secondaryOwners.concat(this.owner);

        /**
         * The bot's vanity URL, if any.
         * @type {String}
         */
        this.vanity = bot.vanityUrl || null;

        /**
         * The bot's total amount of upvotes.
         * @type {Number}
         */
        this.upvotes = bot.votes;

        /**
         * The bot's upvotes in the last 24 hours.
         * @type {Number}
         */
        this.upvotesPast24Hours = bot.votes24;

        /**
         * The bot's upvotes in the last month.
         * @type {Number}
         */
        this.upvotesPastMonth = bot.votesMonth;

        /**
         * The bot's widget URL.
         * @type {String}
         */
        this.widget = bot.widgetUrl || null;
    }

    /**
     * Returns the bot's invite URL with no perms.
     * @type {?String}
     */
    get inviteNoPerms() {
        if (!this.inviteURL) return null;
        return this.inviteURL.replace(/&permissions=[0-9]*/gi, '');
    }

    /**
     * Returns the bot's support code, if any.
     * @type {?String}
     */
    get supportCode() {
        if (!this.supportURL) return null;
        return this.supportURL.replace(/(https|http):\/\/discord\.gg\//, '');
    }

    /**
     * The bot's URL on the site.
     * @type {String}
     */
    get url() {
        return `https://botsfordiscord.com/bot/${this.id}`;
    }

    /**
     * @deprecated Use {@link Bot#inviteURL} or {@link Bot#inviteNoPerms}
     */
    invite(perms = true) {
        return perms ? this.inviteURL : this.inviteNoPerms;
    }

    /**
     * @deprecated Use {@link Bot#supportURL} or {@link Bot#supportCode}
     */
    support(code = false) {
        return code ? this.supportCode : this.supportURL;
    }

    /**
     * Returns the bot mention instead of the Bot object.
     * @returns {String}
     * @example
     * console.log('Oh Hecc this is a bot with mention ${Bot}'); // Oh Hecc this is a bot with mention <@1392832738917398>
     */
    toString() {
        return `<@${this.id}>`;
    }
}

Bot.prototype.invite = util.deprecate(Bot.prototype.invite, 'Bot#invite() => Use Bot#inviteURL or Bot#inviteNoPerms');
Bot.prototype.support = util.deprecate(Bot.prototype.support, 'Bot#support() => Use Bot#supportURL or Bot#supportCode');

exports.Bot = Bot;