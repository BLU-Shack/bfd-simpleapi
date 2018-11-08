/**
 * Options when test-posting a webhook.
 * @class
 * @constructor
 */
class WebhookPostOptions {
    /**
     * @param {WebhookPostOptions} [options={}] Webhook Post Options.
     * @param {ClientOptions} [client={}] The preset Client Options.
     */
    constructor(options = {}, client = {}) {
        /**
         * The example Bot ID that'd been voted by the user.
         * @type {?String}
         */
        this.botID = options.botID || client.botID || null;

        /**
         * The Webhook Secret. Overrides the preset secret.
         * @type {?String}
         */
        this.secret = options.secret || client.secret;

        if (!this.secret) throw new ReferenceError('options.secret must be defined.');
        if (typeof this.secret !== 'string') throw new TypeError('options.secret must be a string.');

        /**
         * The example User ID that'd voted.
         * @type {?String}
         */
        this.userID = options.user || null;

        /**
         * The example object of voting information.
         * @type {?Object}
         */
        this.votes = options.votes || null;
    }
}

exports.WebhookPostOptions = WebhookPostOptions;