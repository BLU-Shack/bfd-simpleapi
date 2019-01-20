const Base = require('./Base.js');

/**
 * Represents a Bot on Bots For Discord
 */
class Bot extends Base {
	constructor(obj) {
		super(obj);

		/**
		 * Whether or not the bot has been approved by Bots for Discord.
		 * @type {boolean}
		 */
		this.approved = obj.approved;

		/**
		 * The timestamp of when the bot had been approved.
		 * @type {?number}
		 */
		this.approvedTimestamp = obj.approvedTime || null;

		/**
		 * The bot's avatar code.
		 * @type {string}
		 */
		this.avatar = obj.avatar;

		/**
		 * The bot's background color in HEX.
		 * @type {string}
		 */
		this.backgroundColor = obj.color;

		/**
		 * The bot's client ID, if different from its Discord ID.
		 * @type {?string}
		 */
		this.clientID = obj.clientId || null;

		/**
		 * The bot's Discord discriminator.
		 * @type {string}
		 */
		this.discriminator = obj.discrim;

		/**
		 * Whether or not the bot is currently featured on the front page of Bots for Discord.
		 * @type {boolean}
		 */
		this.featured = obj.featured;

		/**
		 * The bot's GitHub Repository.
		 * @type {?string}
		 */
		this.github = obj.github || null;

		/**
		 * The number of guilds the bot is in.
		 * @type {?number}
		 */
		this.guildCount = obj.server_count;

		/**
		 * The bot's Discord ID.
		 * @type {string}
		 */
		this.id = obj.id;

		/**
		 * The bot's invite URL.
		 * @type {string}
		 */
		this.invite = obj.invite;

		/**
		 * The library used to program the bot.
		 * @type {string}
		 */
		this.library = obj.library;

		/**
		 * The bot's Discord Username.
		 * @type {string}
		 */
		this.username = obj.name;

		/**
		 * The bot's main owner's ID.
		 * @type {string}
		 */
		this.ownerID = obj.owner;

		/**
		 * The bot's secondary owners' IDs.
		 * @type {string[]}
		 */
		this.secondaryOwnerIDs = obj.owners;

		/**
		 * The bot's prefix.
		 * @type {string}
		 */
		this.prefix = obj.prefix;

		/**
		 * The bot's short description.
		 * @type {string}
		 */
		this.shortDescription = obj.short_desc;

		/**
		 * The bot's support server invite.
		 * @type {string}
		 */
		this.supportURL = obj.support_server || null;

		/**
		 * The bot's Discord Tag.
		 * @type {string}
		 */
		this.tag = obj.tag;

		/**
		 * The bot's vanity URL.
		 * @type {string}
		 */
		this.vanityURL = obj.vanityUrl || null;

		/**
		 * Whether or not the bot has been verified by Bots for Discord.
		 * @type {boolean}
		 */
		this.verified = obj.verified;

		/**
		 * The bot's recent vote activity.
		 * @type {object}
		 * @property {number} total The total number of accumulated votes.
		 * @property {number} last24Hours The number of votes in the past 24 hours.
		 * @property {number} lastMonth The number of votes in the past month.
		 */
		this.votes = {
			total: obj.votes,
			last24Hours: obj.votes24,
			lastMonth: obj.votesMonth,
		};

		/**
		 * Whether or not the bot is a website bot.
		 * @type {boolean}
		 */
		this.websiteBot = obj.website_bot;
	}

	/**
	 * The bot's Discord Avatar URL.
	 * @type {string}
	 */
	get avatarURL() {
		return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`;
	}

	/**
	 * The bot's invite, but no permission requirements.
	 * @type {string}
	 */
	get inviteNoPerms() {
		return this.invite.replace(/&permissions=\d+/gi, '&permissions=0');
	}

	/**
	 * The bot's page on Bots for Discord.
	 * @type {string}
	 */
	get page() {
		return `https://botsfordiscord.com/bots/${this.id}`;
	}

	/**
	 * The bot's support server code.
	 * If it does not match the Discord invite regex, this returns null.
	 * @type {?string}
	 */
	get supportCode() {
		if (!this.supportURL) return null;
		else if (!this.supportURL.match(/https:\/\/discord.gg\/[A-Za-z0-9]/)) return null;
		else return this.supportURL.split('/').pop();
	}

	/**
	 * The bot's vanity code on Bots for Discord.
	 * @type {?string}
	 */
	get vanityCode() {
		if (!this.vanityURL) return null;
		else return this.vanityURL.split('/').pop();
	}

	/**
	 * Returns text that Discord recognizes as a User Mention.
	 * @type {string}
	 */
	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = Bot;