<div style='text-align: center;'>
    <p>
        <img src='https://i.imgur.com/TvAtKmw.png' width=450 height=230>
    </p>
    <p>
        <a href='https://nodei.co/npm/bfd-simpleapi/'><img src='https://nodei.co/npm/bfd-simpleapi.png'></a>
    </p>
</div>

# Bots for Discord - Alternative Simplified Wrapper

An API wrapper to Bots for Discord; A more simplified alternative than the [official wrapper for Bots For Discord](https://www.npmjs.com/package/bfd-api).

To install this package, use ``npm i bfd-simpleapi`` (Super useless line since you should already know how to install packages by now...)

|Key Differences|Examples|
|-|-|
|Premade Classes for Bots and Users<br>Different value names.|``.clientId`` to ``.clientID``; To use the plain object values, include ``{ normal: true }`` in FetchOptions. |
|Can be used simple, or "advanced".|Simple: ``.fetchSelf();``<br>"Advanced?": ``.fetchSelf({ specified: 'username' });``|
|Different Function Names|``.getBot();`` => ``.fetchBot();``|

## Usage 101

```js
// Require the package.
const Example = require('bfd-simpleapi');

// options (?ClientOptions) The Client Options.
// options.token (String) => Your API token from ze site. Required for POST functions, like setting server count. If you are not going to use this (no posting server count), just put 'none'
// options.botID (String) => Your bot ID for use here. Required for checking self things. Put 'none' if this is not going to be for usage.
// options.client (?Object) => The discord.js#Client object.
// options.log (?Boolean = false) => Whether or not to log every FETCH action.
const Client = new Example(?options);
```

**For the following examples, we will assume:**
* options.token is a valid token.
* options.botID is '463803888072523797'.
* options.client is missing.
* options.log is false.

```js
// Post your server count to your bot.
// options (?PostOptions) => Post the amount of servers your bot is in. Not needed if you had supplied a valid client object on initialization.
// options.guildCount (?Number) => Define the server count to push to the site. Not needed if client is pre-supplied, but defining options.guildCount WILL override.
// options.token (?String) => Set the API token for input. (Doesn't change Client.options)
// options.botID (?String) => Set the botID for input. (Doesn't change Client.options)
Client.setCount(?options);
Client.setCount({ guildCount: 1337 }); // Don't even bother.
Client.setCount({ guildCount: 1000, token: 'RealToken', botID: 'RealBotID' }); // Failure.
```

```js
// Fetch a bot from the list.
// botID (String) => The bot ID to fetch.
// options (?FetchOptions) => A specific thing to get, like "verified" or "username"
Client.fetchBot(botID, ?options);
Client.fetchBot('463803888072523797');
Client.fetchBot('463803888072523797', { specified: 'username' }); // Moddy ©
```

```js
// Fetch a bot from the list using options.botID.
// options (?FetchOptions) => A specific thing to get, like "verified" or "username"
Client.fetchSelf(?options);
Client.fetchSelf();
Client.fetchSelf({ specified: 'username' }); // Moddy ©

// Check if a bot is verified or not. (This is the only different from the official one; This one here returns a boolean, not a string "true" or "false")
// botID (String) => The bot ID to check.
Client.isVerified(botID);
Client.isVerified('463803888072523797'); // false
```

```js
// Check if a bot is verified using this.options.botID
Client.isVerifiedSelf(); // false
```

```js
// Fetch a user that has logged on the site.
// userID (String) => The user ID to check.
// options (?FetchOptions) => A specific thing to get, like "tag"
Client.fetchUser(userID, ?options);
Client.fetchUser('235593018332282884');
Client.fetchUser('235593018332282884', { specified: 'tag' }); // iRED#9987
```

```js
// Edit a value with a convenience function.
// options (ClientOptions) => The Client Options to edit.
// preset (?Boolean) => Whether or not to use the default client options as the reference for editing. (Please don't touch the code)
Client.edit(options, ?preset = false);
Client.edit({ token: 'xxx' }); // { token: 'xxx', ... }
```
```js
// Fetch the widget from the site.
// botID (String) => The bot ID for the widget.
// options (?WidgetFetchOptions) => The widget fetch options.
// options.width (?Number) => The widget width to set.
// options.height (?Number) => The widget height to set.
Client.fetchWidget(botID, ?options);
Client.fetchWidget('463803888072523797'); // Buffer
Client.fetchWidget('463803888072523797', { height: 666, width: 999 }); // Buffer
```

```js
// Fetch the widget from the site using options.botID.
// options (?WidgetFetchOptions) => The widget fetch options.
Client.fetchWidgetSelf(?options);
```
An Example Widget Preview:

</details>

## Miscellaneous Info

* Discord Tag: iRED#9987
* [Main Server](https://discord.gg/JTY8MnW) - Get notified when new versions are released by using ``rnotif bfd`` in #bot-coms
