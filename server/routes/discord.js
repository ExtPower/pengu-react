const { Client, GatewayIntentBits,Partials} = require('discord.js')
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,

        // ...
    ],
    partials: [Partials.Channel],
})
bot.on('ready', () => {
    console.log("bot");
});

bot.login('MTAxNTM0NTU0ODA1MzcyMTIwOA.GxuDOc.S1VpKLUxrJ55gYxlvjWWLV9oq1j5FvK2vg5res');
console.log('bot.login');

bot.on('messageCreate', async (message) => {

    console.log("content", message.content);

    console.log("guildId", message.guildId);

    console.log("channelId", message.channelId);
});