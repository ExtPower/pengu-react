const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const Store = require('./modules/Store.js');
const { PromisifiedQuery, _escpe, getData, checkAuth } = require('./modules/functions.js');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"]
    }
});
var supportedServers = []
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');
const uuid = require("uuid").v4
// const Discord = require("discord.js");
// const client = new Discord.Client();

dotenv.config({ path: path.join(__dirname, ".env") })
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')))
// discord
const { Client, GatewayIntentBits, Partials } = require('discord.js')
const server_id = "1008830510665039942"
const verified_role_id = "1008831152380981288"
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences

        // ...
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
})

console.log('bot.login');
bot.login(process.env.BOT_TOKEN);
bot.on('ready', async () => {
    console.log("bot");
    setInitialStoreValues()
});
bot.on('guildCreate', async (guild) => {
    setInitialStoreValues()
    io.emit(`guilds-change`)

});
bot.on('guildDelete', async (guild) => {
    setInitialStoreValues()
    var guildId = guild.id
    io.emit(`guilds-change`)
    io.emit(`${guildId}-*`)
});

bot.on('messageCreate', async (message) => {
    var author = message.author
    var msgDiscordId = message.id
    var msgId = uuid()
    var channelId = message.channelId
    var guildId = message.guildId
    var authorId = author.id
    var authorAvatar = `https://cdn.discordapp.com/avatars/${authorId}/${author.avatar}.png`
    var authorName = author.tag
    var msgContent = message.content
    var msgUrl = message.url
    var msgAttachements = [...message.attachments].map(e => e[1])
    var msgCreatedTimestamp = message.createdTimestamp
    var promises = []
    promises.push(PromisifiedQuery(`INSERT INTO discord_msgs_found (
        msg_discord_id,
        msg_id,
        msg_channel_id,
        msg_guild_id,
        user_id,
        user_avatar,
        user_tag,
        msg_content,
        msg_url,
        created_time_stamp
    ) VALUES (
        "${_escpe(msgDiscordId)}",
        "${_escpe(msgId)}",
        "${_escpe(channelId)}",
        "${_escpe(guildId)}",
        "${_escpe(authorId)}",
        "${_escpe(authorAvatar)}",
        "${_escpe(authorName)}",
        "${_escpe(msgContent)}",
        "${_escpe(msgUrl)}",
        "${_escpe(msgCreatedTimestamp)}"
    )`))
    for (let i = 0; i < msgAttachements.length; i++) {
        const msgAttachement = msgAttachements[i];
        promises.push(PromisifiedQuery(`INSERT INTO discord_msgs_attachements (
            msg_id,
            attachement_url,
            width,
            height
        ) VALUES (
            "${_escpe(msgId)}",
            "${_escpe(msgAttachement.url)}",
            "${_escpe(msgAttachement.width)}",
            "${_escpe(msgAttachement.height)}"
        )`))
    }
    Promise.all(promises).then((data) => {

    })
});


// end
// discordstrategy
const DiscordStrategy = require("passport-discord").Strategy;

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CLIENT_REDIRECT,
            scope: ["identify", "email", "guilds", "messages.read"],
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            console.log(profile);
            var username = `${profile.username}#${profile.discriminator}`;
            var discordId = profile.id
            var authorAvatar = `https://cdn.discordapp.com/avatars/${discordId}/${profile.avatar}.png`
            var email = profile.email

            try {
                var user = await PromisifiedQuery(`SELECT * FROM users WHERE discord_id="${_escpe(discordId)}"`)
                    .then((results) => {
                        return results[0] || { user_id: null }
                    });
                if (user.user_id != null) {
                    console.log("User exists");
                    if (user.username != username || user.discord_avatar != authorAvatar || user.email != email) {
                        await PromisifiedQuery(`UPDATE users SET 
                            username="${_escpe(username)}",
                            discord_avatar="${_escpe(authorAvatar)}",
                            email="${_escpe(email)}",
                            discord_id="${_escpe(profile.id)}"
                        WHERE user_id="${_escpe(user.user_id)}"`).then(() => {
                            user = {
                                ...user,
                                username,
                                discord_avatar: authorAvatar,
                                email,
                                discord_id: profile.id
                            }
                        })
                    }
                } else {
                    var userId = uuid()
                    console.log("User does not exist");
                    await PromisifiedQuery(`INSERT INTO users(user_id, username, discord_avatar, email, discord_id)
                        VALUES 
                    (
                        "${_escpe(userId)}",
                        "${_escpe(username)}",
                        "${_escpe(authorAvatar)}",
                        "${_escpe(email)}",
                        "${_escpe(profile.id)}"
                    )`).then((results) => {
                        console.log("User created");
                        user = {
                            user_id: userId,
                            username,
                            discord_avatar: authorAvatar,
                            email,
                            discord_id: profile.id
                        }
                    })
                }
                console.log("User submitted");
                done(null, user);
            } catch (err) {
                console.log("Discord Token Err");
                console.log(err);
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    var { user_id } = user;
    console.log("Serialize");
    done(null, user_id);
});

passport.deserializeUser(async (userId, done) => {
    console.log("Deserializing");
    var { user_id, email, username, discord_id, discord_avatar } = await PromisifiedQuery(`SELECT * FROM users WHERE user_id="${_escpe(userId)}"`).then((results) => results[0] || { user_id: null });
    var user = { user_id, email, username, discord_id, discord_avatar }
    if (user.user_id != null) done(null, user);
});


// end
const authRoute = require('./routes/auth');
var sessionMiddleware = session({
    secret: process.env.SECRET_SESSION_KEY,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    saveUninitialized: false,
    resave: false,
})
app.use(sessionMiddleware);
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
app.use(express.static(path.join(__dirname, 'static')));

app.use(passport.initialize());
app.use(passport.session());



// only allow authenticated users
io.use((socket, next) => {
    const session = socket.request.session;
    const userId = session.passport?.user || null
    if (session && userId != null) {
        next();
    } else {
        next(new Error("unauthorized"));
    }
});

app.use('/auth', authRoute);
app.get("/login", function (req, res) {
    res.redirect("/")
})
app.get(["/", "/dashboard*"], checkAuth, async function (req, res) {
    console.log(await getData(req.user));
    res.sendFile(path.join(__dirname, 'static/index.html'));
})



io.on("connection", async (socket) => {
    const userId = socket.request.session.passport.user || null
    var { user_id, email, username, discord_id, discord_avatar } = await PromisifiedQuery(`SELECT * FROM users WHERE user_id="${_escpe(userId)}"`).then((results) => results[0] || { user_id: null });
    var user = { user_id, email, username, discord_id, discord_avatar }
    var userData = await getData(user)
    if (Store.verifiedUsers.filter(e => e == userData.username).length == 0) {
        socket.disconnect()
    }
    socket.emit("connected")
    const discordTasks = userData.tasksData.discordTasks
    const openseaTasks = userData.tasksData.openseaTasks
    const twitterTasks = userData.tasksData.twitterTasks
    for (let i = 0; i < discordTasks.length; i++) {

    }
    for (let i = 0; i < openseaTasks.length; i++) {

    }

    for (let i = 0; i < twitterTasks.length; i++) {

    }

    socket.on("create-task", async (action) => {
        var taskId = uuid()
        var type = action.type || null
        var data = action.data
        var taskName = data.name

        await PromisifiedQuery(`INSERT INTO tasks (user_id, task_id, name, type) 
        VALUES 
        (
            "${_escpe(userId)}",
            "${_escpe(taskId)}",
            "${_escpe(taskName)}",
            "${_escpe(type)}"
        )`)
        if (type == "discord") {
            var channel_id = data.channel_id
            var guild_id = data.guild_id
            await PromisifiedQuery(`INSERT INTO tasks_discord (task_id, channel_id, guild_id) 
            VALUES 
            (
                "${_escpe(taskId)}",
                "${_escpe(channel_id)}",
                "${_escpe(guild_id)}"
            ) `)

        } else if (type == "opensea") {
            var link = data.link
            var type_opensea = data.type
            await PromisifiedQuery(`INSERT INTO tasks_opensea (task_id, link, type) 
            VALUES 
            (
                "${_escpe(taskId)}",
                "${_escpe(link)}",
                "${_escpe(type_opensea)}"
            ) `)
        } else if (type == "twitter") {
            var handle = data.handle
            var retweets = data.retweets
            var quote_tweets = data.quote_tweets
            var type_twitter = data.type
            await PromisifiedQuery(`INSERT INTO tasks_twitter (task_id, handle, retweets, quote_tweets, type) 
            VALUES 
            (
                "${_escpe(taskId)}",
                "${_escpe(handle)}",
                "${_escpe(retweets)}",
                "${_escpe(quote_tweets)}",
                "${_escpe(type_twitter)}"
            ) `)
        }
        getData(userData).then((userData1) => {
            socket.emit("userData-changed", userData1)
            userData = userData1
        })
    })
    socket.on("get-supported-servers", action => {
        socket.emit("supported-servers-changed", Store.supportedServers)
    })
});
function setInitialStoreValues() {
    const Guilds = [...bot.guilds.cache].map(e => e[1])
    Store.supportedServers = Guilds.map(supportedServer => {
        var nonCategoryChannel = [...supportedServer.channels.cache].map(e => e[1]).filter(e => e.constructor.name != "CategoryChannel")
        return {
            id: supportedServer.id,
            name: supportedServer.name,
            channels: nonCategoryChannel.map(e => {
                return {
                    id: e.id,
                    name: e.name
                }
            })
        }
    })
    Store.verifiedUsers = bot.guilds.cache.get(server_id)?.roles?.cache?.get(verified_role_id)?.members?.map(m => m.user.tag) || [];

}

instrument(io, { auth: false })
httpServer.listen(3000);