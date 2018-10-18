# Bots for Discord - Alternative and Simplified Wrapper

[![NPM](https://nodei.co/npm/bfd-simpleapi.png)](https://nodei.co/npm/bfd-simpleapi/)

An API wrapper to Bots for Discord; A more simplified alternative than the [official wrapper for Bots For Discord](https://www.npmjs.com/package/bfd-api).

This is made to be more simplified than the official. Also as a fun little project.

To install this package, use ``npm i bfd-simpleapi`` (Super useless line since you should already know how to install packages by now...)

## What sets this different than the original?

* Random shit boi.

## Examples

```js
// First, you have to initialize the package. Obviously.
const Example = require('bfd-simpleapi');

// options (?ClientOptions) The Client Options.
// options.token (String) => Your API token from ze site. Required for POST functions, like setting server count. If you are not going to use this (no posting server count), just put 'none'
// options.botID (String) => Your bot ID for use here. Required for checking self things. Put 'none' if this is not going to be for usage.
// options.client (?Object) => The discord.js#Client object.
// options.log (?Boolean = false) => Whether or not to log every FETCH action.
const Client = new Example(token, botID, ?client, ?log);

// Post your server count to your bot.
// serverSize (?Number) => Post the amount of servers your bot is in. Not needed if you had supplied a valid client object on initialization.
Client.setCount(?serverSize);
Client.setCount(10);

// Fetch a bot from the list.
// botID (String) => The bot ID to fetch.
// options (?FetchOptions) => A specific thing to get, like "verified" or "username"
Client.fetchBot(botID, ?options);
Client.fetchBot('463803888072523797');
Client.fetchBot('463803888072523797', { specified: 'username' }); // Moddy ©

// Fetch a bot from the list using options.botID.
// options (?FetchOptions) => A specific thing to get, like "verified" or "username"
Client.fetchSelf(?options);
Client.fetchSelf();
Client.fetchSelf({ specified: 'username' });

// Check if a bot is verified or not! (This is the only different from the official one; This one here returns a boolean, not a string "true" or "false")
// botID (String) => The bot ID to check.
Client.checkVerif(botID);
Client.checkVerif('463803888072523797'); // false

// Check if your own bot is verified or not!
Client.checkVerifSelf();

// Fetch a user that has logged on the site!
// userID (String) => The user ID to check.
// options (?FetchOptions) => A specific thing to get, like "tag"
Client.fetchUser(userID, ?options);
Client.fetchUser('235593018332282884');
Client.fetchUser('235593018332282884', { specified: 'tag' }); // iRED#9987

// Edit a value with a convenience function.
// options (ClientOptions) => The Client Options to edit.
// preset (?Boolean) => Whether or not to use the default client options as the reference for editing. (Please don't touch the code)
Client.edit(options, ?preset);
Client.edit({ token: 'xxx' }); // { token: 'xxx', ... }

// Fetch the widget from the site.
// botID (String) => The bot ID for the widget.
// options (?WidgetFetchOptions) => The widget fetch options.
// options.width (?Number) => The widget width to set.
// options.height (?Number) => The widget height to set.
Client.fetchWidget(botID, ?options);
Client.fetchWidget('463803888072523797'); // Buffer
Client.fetchWidget('463803888072523797', { height: 666, width: 999 }); // Buffer but with meme.

// Fetch the widget from the site using options.botID.
// options (?WidgetFetchOptions) => The widget fetch options.
Client.fetchWidgetSelf(?options);
```

## Update Notes Section

# nope.avi