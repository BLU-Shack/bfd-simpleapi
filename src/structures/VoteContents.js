const Base = require('./Base.js');

/**
 * Represents the contents of a bot's votes through the `bots/:id/votes` endpoint.
 * @extends {Base}
 */
class VoteContents extends Base {
	/**
	 * @param {object} obj
	 * @param {string} id
	 */
	constructor(obj, id) {
		super(obj);

		/**
		 * The ID of the bot checking votes from.
		 * @type {string}
		 */
		this.recipientID = id;

		/**
		 * An array of user IDs who have upvoted the bot.
		 * @type {string[]}
		 */
		this.voters = obj.hasVoted;

		/**
		 * An array of user IDs who have upvoted the bot in the past 24 hours.
		 * @type {string[]}
		 */
		this.voters24Hours = obj.hasVoted24;

		/**
		 * The bot's recent vote activity.
		 * @type {Votes}
		 */
		this.votes = {
			total: obj.votes,
			last24Hours: obj.votes24,
			lastMonth: obj.votesMonth,
		};
	}
}

module.exports = VoteContents;