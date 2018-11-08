/**
 * The client options.
 * @class
 */
class ClientOptions {
    /**
     * @constructor
     * @param {ClientOptions} newObj The new client options.
     * @param {ClientOptions} [oldObj=ClientOptions.default] The old/preset client options.
     */
    constructor(newObj, oldObj = ClientOptions.default) {
        /**
         * The API token, required for certain actions.
         * @type {?String}
         */
        this.token = newObj.token ? newObj.token !== 'none' ? newObj.token : false : oldObj.token;

        /**
         * The bot ID, for "self" actions.
         * @type {?String}
         */
        this.botID = newObj.botID ? newObj.botID !== 'none' ? newObj.botID : false : oldObj.botID;

        /**
         * The discord.js#Client object.
         * @type {?Client}
         */
        this.client = newObj.client ? newObj.client !== 'none' ? newObj.client : false : oldObj.client;

        /**
         * Whether or not to log FETCH actions.
         * @type {?Boolean}
         */
        this.log = newObj.log;

        /**
         * Used when test-posting a Webhook.
         * @type {?String}
         */
        this.secret = newObj.secret ? newObj.secret !== 'none' ? newObj.secret : false : oldObj.secret;

        if (typeof this.secret !== 'string' && typeof this.secret !== 'boolean') throw new TypeError('options.secret must be a string or false.');
    }
}

/**
 * The default client options.
 * @static
 */
ClientOptions.default = { token: false, botID: false, client: false, log: false, secret: false };

exports.ClientOptions = ClientOptions;