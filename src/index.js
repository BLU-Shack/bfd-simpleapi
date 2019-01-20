const Bot = require('./structures/Bot.js');
const User = require('./structures/User.js');
const VoteContents = require('./structures/VoteContents.js');

module.exports = {
	Client: require('./Client.js'),
	version: require('../package.json').version,
	Bot,
	User,
	VoteContents,
};