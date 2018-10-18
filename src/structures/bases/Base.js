/**
 * Universal base object.
 * @class
 */
class Base {
    /**
     * @constructor
     * @param {Object} base Base.
     */
    constructor(base) {
        /**
         * The Base's object.
         * @type {String}
         */
        this.id = base.id;

        /**
         * The Base's avatar.
         * @type {String}
         */
        this.avatar = base.avatar;

        /**
         * The Base's username.
         * @type {String}
         */
        this.username = base.name;
    }
}

exports.Base = Base;