const Bot = require('./structures/Bot.js');
const User = require('./structures/User.js');

module.exports = {
	Client: require('./Client.js'),
	version: require('../package.json').version,
	Bot,
	User,
};