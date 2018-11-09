/**
 * An error that is thrown when an error occurs whilst fetching.
 * @class
 * @constructor
 * @extends {Error}
 */
class FetchError extends Error {
    /**
     * @param {*} message The Error Message.
     */
    constructor(message) {
        super(message);
        this.name = 'FetchError';
        this.message = message;

        if (Error.captureStackTrace) Error.captureStackTrace(this, FetchError);
    }
}

exports.FetchError = FetchError;