/**
 * Post Options when posting guild size.
 * @class
 */
class PostOptions {
    /**
     * @constructor
     * @param {Object} options The Post Options.
     * @param {Object} preset The already set options.
     */
    constructor(options, preset) {
        /**
         * The API token.
         * @type {String}
         */
        this.token = options.token || preset.token;

        /**
         * The bot ID.
         * @type {String}
         */
        this.botID = options.botID || preset.botID;

        /**
         * The guild count.
         * @type {Number}
         */
        this.guildCount = options.guildCount;
    }
}

exports.PostOptions = PostOptions;