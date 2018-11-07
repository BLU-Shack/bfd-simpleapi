/**
 * The client options.
 * @class
 */
class ClientOptions {
    /**
     * @constructor
     * @param {Object} newObj The new client options.
     * @param {Object} [oldObj=ClientOptions.default] The old/preset client options.
     */
    constructor(newObj, oldObj = ClientOptions.default) {
        /**
         * The API token, required for certain
         * @type {String}
         */
        this.token = newObj.token ? newObj.token !== 'none' ? newObj.token : false : oldObj.token;

        /**
         * The bot ID, for "self" actions.
         * @type {String}
         */
        this.botID = newObj.botID ? newObj.botID !== 'none' ? newObj.botID : false : oldObj.botID;

        /**
         * The discord.js#Client object.
         * @type {Object}
         */
        this.client = newObj.client ? newObj.client !== 'none' ? newObj.client : false : oldObj.client;

        /**
         * Whether or not to log FETCH actions.
         * @type {Boolean}
         */
        this.log = newObj.log;
    }
}

/**
 * The default client options.
 * @static
 */
ClientOptions.default = { token: false, botID: false, client: false, log: false };

exports.ClientOptions = ClientOptions;