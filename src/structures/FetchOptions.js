/**
 * Optional Fetch Options when fetching for something on the site.
 * @class
 */
class FetchOptions {
    constructor(options) {
        /**
         * Whether or not to only return the plain fetched object.
         * @type {Boolean}
         */
        this.normal = options.normal;
        /**
         * Whether or not to output a specified thing.
         * @type {String}
         */
        this.specified = options.specified ? options.specified : false;
    }
}

exports.FetchOptions = FetchOptions;