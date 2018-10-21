const Base = require('./bases/Base').Base;

/**
 * Represents a user on the site.
 * @class
 * @extends {Base}
 */
class User extends Base {
    /**
     * @constructor
     * @param {Object} user The plain user object that was fetched from the API.
     */
    constructor(user) {
        super(user);
        /**
         * Represents the plain user object used.
         * @type {Object}
         */
        this.user = user;
        /**
         * The user's biography.
         * @type {String}
         */
        this.bio = user.bio;
        /**
         * Whether or not the user is an administrator on the site.
         * @type {Boolean}
         */
        this.isAdmin = user.isAdmin;
        /**
         * Whether or not the user is banned from the site.
         * @type {Boolean}
         */
        this.isBanned = user.isBanned;
        /**
         * Whether or not the user is a moderator on the site.
         * @type {Boolean}
         */
        this.isMod = user.isMod;
        /**
         * Whether or not the user is a verified developer/has a verified bot.
         * @type {Boolean}
         */
        this.isVerifiedDeveloper = user.isVerifiedDev;
        /**
         * The user's website, if any.
         * @type {String|null}
         */
        this.website = user.website || null;
        /**
         * The user's background, if any.
         * @type {String|null}
         */
        this.background = user.background || null;
    }
}

exports.User = User;