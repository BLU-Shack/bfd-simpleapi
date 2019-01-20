const Base = require('./Base.js');

/**
 * Represents a Bot on Bots For Discord
 */
class Bot extends Base {
	constructor(obj) {
		super(obj);

		this.approved = obj.approved;

		this.approvedTimestamp = obj.approvedTime;

		this.avatar = obj.avatar;

		this.backgroundColor = obj.color;

		this.clientID = obj.clientId || null;

		this.discriminator = obj.discrim;

		this.featured = obj.featured;

		this.github = obj.github || null;

		this.guildCount = obj.server_count;

		this.id = obj.id;

		this.invite = obj.invite;

		this.library = obj.library;

		this.name = obj.name;

		this.ownerID = obj.owner;

		this.secondaryOwnerIDs = obj.owners;

		this.prefix = obj.prefix;

		this.shortDescription = obj.short_desc;

		/**
		 * The bot's support server invite.
		 * @type {string}
		 */
		this.supportURL = obj.support_server || null;

		this.tag = obj.tag;

		this.vanityURL = obj.vanityUrl || null;

		this.verified = obj.verified;

		this.votes = {
			total: obj.votes,
			last24Hours: obj.votes24,
			lastMonth: obj.votesMonth,
		};

		this.websiteBot = obj.website_bot;
	}

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

	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = Bot;