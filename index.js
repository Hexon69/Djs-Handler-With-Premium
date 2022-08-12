const { Intents, Collection } = require("discord.js");
const Client = require("./Structures/Client.js");
const mongoose = require("mongoose")
const { Database } = require('quickmongo')
const client = new Client({
	  shards: "auto",
    allowedMentions: {
      parse: [
            "users", 
            "roles", 
            "everyone"
        ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

module.exports = client;
client.db = new Database(client.config.Mongoose)
client.timeouts = new Collection()


 require("./Structures/Event")(client)
 require("./Structures/Command")(client)
 require("./Structures/slashCommand")(client)
client.color = client.config.Bot.Color;

client.start(client.config.Bot.ClientToken);
