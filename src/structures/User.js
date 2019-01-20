const Base = require('./Base.js');

/**
 * Represents a user on Bots for Discord.
 * @extends {Base}
 */
class User extends Base {
	constructor(obj) {
		super(obj);

		/**
		 * The user's avatar code on Discord.
		 * @type {string}
		 */
		this.avatar = obj.avatar;

		/**
		 * The user's background image on Bots for Discord.
		 * @type {?string}
		 */
		this.background = obj.background || null;

		/**
		 * The user's biography on Bots for Discord.
		 * @type {?string}
		 */
		this.biography = obj.bio;

		/**
		 * The user's Discord Discriminator.
		 * @type {string}
		 */
		this.discriminator = obj.discrim;

		/**
		 * The user's Discord ID.
		 * @type {string}
		 */
		this.id = obj.id;

		/**
		 * The user's positions on Bots for Discord.
		 * @type {object}
		 * @property {boolean} admin
		 * @property {boolean} juniorMod
		 * @property {boolean} mod
		 * @property {boolean} verifiedDev
		 */
		this.roles = {
			admin: obj.isAdmin,
			juniorMod: obj.isJrMod,
			mod: obj.isMod,
			verifiedDev: obj.isVerifiedDev,
		};

		/**
		 * The user's Discord Tag.
		 * @type {string}
		 */
		this.tag = obj.tag;

		/**
		 * The user's username on Discord.
		 * @type {string}
		 */
		this.username = obj.username;

		/**
		 * The user's website.
		 * @type {?string}
		 */
		this.website = obj.website || null;
	}

	/**
	 * The user's Discord Avatar URL.
	 * @type {string}
	 */
	get avatarURL() {
		return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`;
	}

	/**
	 * The user's page on Bots for Discord.
	 * @type {string}
	 */
	get page() {
		return `https://botsfordiscord.com/users/${this.id}`;
	}

	/**
	 * Returns text that Discord recognizes as a user mention.
	 * @type {string}
	 */
	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = User;