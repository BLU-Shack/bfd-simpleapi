<div style='text-align: center;'>
    <p>
        <img src='https://i.imgur.com/TvAtKmw.png' width=450 height=200>
    </p>
    <p>
        <a href='https://nodei.co/npm/bfd-simpleapi/'><img src='https://nodei.co/npm/bfd-simpleapi.png'></a>
    </p>
</div>

# Bots for Discord - Alternative Simplified Wrapper

An alternative API wrapper to Bots for Discord

To install this package, use ``npm i bfd-simpleapi`` (Super useless line since you should already know how to install packages by now...)

|Key Differences from [Main Package](https://www.npmjs.com/package/bfd-api)|Examples|
|-|-|
|Premade Classes for Bots and Users; Different value names.|``.clientId`` to ``.clientID``To use the plain object values, include ``{ normal: true }`` in FetchOptions. |
|Can be used simple, or "advanced". (Yeah, I have no idea what an advanced mechanic would be to provide...)|Simple: ``.fetchSelf();``<br>"Advanced?": ``.fetchSelf({ specified: 'username' });``|
|Different Function Names|``.getBot();`` => ``.fetchBot();``|
|Missing Values are null'd instead of an empty string.|`''` => `null`|
|Uses node-fetch rather than snekfetch|``Code that you will never understand.``|

# Usage 101

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
* options.botID is '374076950924230656'.
* options.client is missing.
* options.log is false.

<details>
<summary>Post Server Count to the site</summary>

```js
// options (?PostOptions) => Post the amount of servers your bot is in. Not needed if you had supplied a valid client object on initialization.
// options.guildCount (?Number) => Define the server count to push to the site. Not needed if client is pre-supplied, but defining options.guildCount WILL override.
// options.token (?String) => Set the API token for input. (Doesn't change Client.options)
// options.botID (?String) => Set the botID for input. (Doesn't change Client.options)
Client.setCount(?options);
Client.setCount({ guildCount: 1337 }); // Don't even bother.
Client.setCount({ guildCount: 1000, token: 'RealToken', botID: 'RealBotID' }); // Failure.
```

</details>
<br>
<details>
<summary>Fetch a bot on the site</summary>

```js
// botID (String) => The bot ID to fetch.
// options (?FetchOptions) => Fetch Options.
// options.normal => Whether or not to get the plain bot object.
// options.specified => The specific value to get.
Client.fetchBot(botID, ?options);
Client.fetchBot('374076950924230656');
Client.fetchBot('374076950924230656', { specified: 'username' }); // Kenny
```

</details>
<br>
<details>
<summary>Fetch a bot on the site using options.botID</summary>

```js
// options (?FetchOptions) => A specific thing to get, like "verified" or "username"
Client.fetchSelf(?options);
Client.fetchSelf();
Client.fetchSelf({ specified: 'username' }); // Kenny
```

</details>
<br>
<details>
<summary>Check if a bot is verified or not</summary>

```js
// botID (String) => The bot ID to check.
Client.isVerified(botID);
Client.isVerified('374076950924230656'); // true
```

</details>
<br>
<details>
<summary>Check if a bot is verified or not using options.botID</summary>

```js
Client.isVerifiedSelf(); // true
```

</details>
<br>
<details>
<summary>Fetch a user on the site</summary>

```js
// userID (String) => The user ID to check.
// options (?FetchOptions) => A specific thing to get, like "tag"
Client.fetchUser(userID, ?options);
Client.fetchUser('235593018332282884');
Client.fetchUser('235593018332282884', { specified: 'tag' }); // iRED#9987
```

</details>
<br>

<details>
<summary>Fetches the bot IDs a user owns.</summary>

```js
// userID (String) => The user ID to fetch their bot IDs from.
Client.fetchUserBots(userID);
Client.fetchUserBots('162780049869635584'); // [ '268597426619809802', '294242685831872512', '304105201651023873', '353287088528949248', '374076950924230656' ];
```

</details>
<br>
<details>
<summary>Edit the options presupplied or not</summary>

```js
// options (ClientOptions) => The Client Options to edit.
// preset (?Boolean) => Whether or not to use the default client options as the reference for editing. (Please don't touch the code)
Client.edit(options, ?preset = false);
Client.edit({ token: '100% Real Token Mate' }); // { token: '100% Real Token Mate', ... }
```

</details>
<br>
<details>
<summary>Fetch a bot's widget on the site</summary>

```js
// botID (String) => The bot ID for the widget.
// options (?WidgetFetchOptions) => The widget fetch options.
// options.width (?Number) => The widget width to set.
// options.height (?Number) => The widget height to set.
Client.fetchWidget(botID, ?options);
Client.fetchWidget('374076950924230656'); // Buffer
Client.fetchWidget('374076950924230656', { height: 666, width: 999 }); // Buffer but with Meme Intensified.
```

An Example Widget Preview:

<a href='https://botsfordiscord.com/bots/374076950924230656'><img src='https://botsfordiscord.com/api/bot/374076950924230656/widget' height=160 width=355 alt='Preview Unavailable'></a>

</details>
<br>
<details>
<summary>Fetch a bot's widget using options.botID</summary>

```js
// options (?WidgetFetchOptions) => The widget fetch options.
// options.width (?Number) => The widget width to set.
// options.height (?Number) => The widget height to set.
Client.fetchWidgetSelf(?options);
```

</details>
<br>

<details>
<summary>Deprecated Functions</summary>

* ``setCount`` => ``setGuilds``
* ``checkVerif`` => ``isVerified``
* ``checkVerifSelf`` => ``isVerifiedSelf``

</details>

# Miscellaneous Info

* Discord Tag: iRED#9987
* [Main Server](https://discord.gg/JTY8MnW) - Get notified when new versions are released by using ``rnotif bfd`` in #bot-coms
* [My Steam Profile](https://steamcommunity.com/id/ired_me)