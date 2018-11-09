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
        this.username = base.username || base.name;

        /**
         * The Base's discriminator.
         * @type {String}
         */
        this.discriminator = base.discrim;

        /**
         * The Base's tag.
         * @type {String}
         */
        this.tag = base.tag;
    }
}

exports.Base = Base;