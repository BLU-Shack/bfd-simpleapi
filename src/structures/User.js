const Base = require('./Base.js');

class User extends Base {
	constructor(obj) {
		super(obj);

		this.avatar = obj.avatar;
		this.background = obj.background || null;
		this.biography = obj.bio;
		this.discriminator = obj.discrim;
		this.id = obj.id;
		this.roles = {
			admin: obj.isAdmin,
			juniorMod: obj.isJrMod,
			mod: obj.isMod,
			verifiedDev: obj.isVerifiedDev,
		};
		this.tag = obj.tag;
		this.username = obj.username;
		this.website = obj.website || null;
	}

	get avatarURL() {
		return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`;
	}

	get page() {
		return `https://botsfordiscord.com/users/${this.id}`;
	}

	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = User;