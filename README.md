# Bots for Discord - Alternative and Simplified Wrapper

An API wrapper to Bots for Discord; A more simplified alternative than the [official wrapper for Bots For Discord](https://www.npmjs.com/package/bfd-api).

This is made to be more simplified than the official. Also as a fun little project.

To install this package, use ``npm i bfd-simpleapi`` (Super useless line since you should already know how to install packages by now...)

## What sets this different than the original?

* Simplified function names, and more memorizable function names.
* Explained functions so you know what to do with them.
* Special stuff.

## Examples

```js
// First, you have to initialize the package. Obviously.
const SimpleAPI = require('bfd-simpleapi');

// token (String) => Your API token from ze site. Required for POST functions, like setting server count. If you are not going to use this (no posting server count), just put 'none'
// botID (String) => Your bot ID for use here. Required for checking self things. Put 'none' if this is not going to be for usage.
// client (?Client_Object = undefined) => Your client object. This will be in use for future functions. Currently, it is useless, so just supply undefined. This will NEVER become a required parameter.
// log (?Boolean = false) => If this should log any POST functions, like posting server count, into the console. There is no way to make custom logs, and no plans are to add that.
const BotList = new SimpleAPI(token, botID, ?client, ?log);

// Post your server count to your bot. [Stable]
// serverSize (?Number) => Post the amount of servers your bot is in. Not needed if you had supplied a valid client object on initialization.
BotList.setCount(?serverSize);
BotList.setCount(10);

// Grab a bot on the list... [Stable]
// botID (String) => The bot ID to fetch.
// specified (?String) => A specific thing to get, like "verified" or "name"
BotList.fetchBot(botID, ?specified);
BotList.fetchBot('463803888072523797');
BotList.fetchBot('463803888072523797', 'name'); // Moddy ©

// ...or the self bot! (Uses the bot ID supplied at Initialization) [Stable]
// specified (?String) => A specific thing to get, like "verified" or "name"
BotList.fetchSelf(?specified);
BotList.fetchSelf();
BotList.fetchSelf('name');

// Check if a bot is verified or not! (This is the only different from the official one; This one here returns a boolean, not a string "true" or "false") [Stable]
// botID (String) => The bot ID to check.
BotList.checkVerif(botID);
BotList.checkVerif('463803888072523797'); // false

// Check if your own bot is verified or not! [New]
BotList.checkVerifSelf();

// Fetch a user that has logged on the site! [New]
// userID (String) => The user ID to check.
// specified (?String) => A specific thing to get, like "tag"
BotList.fetchUser(userID, ?specified);
BotList.fetchUser('235593018332282884');
BotList.fetchUser('235593018332282884', 'tag'); // iRED#9987

// Edit a value with a convenience function. [New]
// key (String) => Whatever to change ('token', 'id', 'client', 'log')
// value (any) => Whatever to edit.
// This returns itself, so you can edit-chain. etc. BotList.edit('id', 'someID').edit('token', 'apiToken');
// Disclaimer: This does not change what your bot shows on the site.
BotList.edit(key, value);
BotList.edit('id', '463803888072523797');
BotList.edit('log', true).edit('id', '463803888072523797');

// This function is not available at the moment. This currently logs a warning for now. [Rusty] [New(???)]
BotList.fetchWidget(botID, size);
```

## Update Notes Section

### v1 Notes Tab

#### v1.0.6

* Updated values, specifically ``token`` and ``botID`` if you supply ``'none'``; It will turn into false.

#### v1.0.4

* Fixed some bugs regarding initialization.

#### v1.0.3
* **You can now specify what you want** when fetching a bot/user.
* **New Shorthand Convenience Functions** for special things.
* **Posting your server count now has a shortcut** - If you supply your client on initialization, you do NOT have to supply serverSize. Supplying one will override the auto value set.

__Minor Notes for v1.0.3__
* Improved code that reduces lines and is now more clean.
* Fixed some error types.
* Changed the class name; Now shorter.
* In the future, setCount may be renamed to a different function.

#### v1.0.1
* **Now has __semi__-improved return statements** so you get a semi-preview of functions (at least in Visual Studio Code?)
* **You can now fetch a user** if you want to get a user.
* **You can now check if your own bot is verified** with a simplified function made specifically for that. Thank us later.
* **Semi-Improved error usage** because SyntaxErrors aren't so great.

### And once, there was darkness.

#### v0.0.0

* Nothing.
* Was.
* Here.

## USERS LOVE IT!

### 10/10 Real reviews from 100% real people. Guaranteed fresh and true.
* Wow, idk who I am, but this is kind of useless. (1 out of 5; RandomJoe666FortniteKoolAid)
* BooooooO! (1 out of 5; HonestOpinions)
* Love it! (5 out of 5; UnpopularOpinionBobby)

## Minor Notes

* This is probably not so stable...Meh!
* Did you know: The USERS LOVE IT tab is 0% true? I know, right?