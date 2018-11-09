/**
 * Optional Fetch Options when fetching for something on the site.
 * @class
 */
class FetchOptions {
    constructor(options) {
        /**
         * Whether or not to only return the plain fetched object.
         * @type {?Boolean}
         */
        this.normal = options.normal || false;

        /**
         * Whether or not to output a specified thing.
         * @type {?String}
         */
        this.specified = options.specified || false;

        /**
         * Whether or not to return a stringified form of the Bot/User. Useless on Webhooks. Overrides normal and special to false if set to true.
         * @type {?Boolean}
         */
        this.stringify = options.stringify || false;

        if (this.stringify) {
            this.normal = false;
            this.specified = false;
        }
    }
}

exports.FetchOptions = FetchOptions;