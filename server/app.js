const express = require('express');
const http = require("http");
var path = require('path');

const https = require("https");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const Store = require('./modules/Store.js');
const { PromisifiedQuery, _escpe, getData, checkAuth, checkNotAuth, getDataWithoutTasks, getTwitterUserData } = require('./modules/functions.js');
const app = express();
const { TwitterApi, ETwitterStreamEvent } = require('twitter-api-v2');
var fs = require("fs")
var isDev___ = true
var options = {
    key: fs.readFileSync(path.join(__dirname, "certificates/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certificates/cert.pem"))
}
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const uuid = require("uuid").v4
// const Discord = require("discord.js");
// const client = new Discord.Client();

dotenv.config({ path: path.join(__dirname, ".env") })
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')))
const server_id = "990097643139108896"
const verified_role_id = "1041891597819838495"

// twitter strategie
const TwitterStrategy = require("passport-twitter").Strategy;
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT_TWITTER,
    passReqToCallback: true,
},
    async function (req, token, tokenSecret, profile, done) {
        var user = req.user
        var twitterId = profile.id
        var username = profile.username
        var displayName = profile.displayName
        var profilePicutre = profile.photos?.[0]?.value || ""
        try {
            if (req.isAuthenticated()) {
                var twitterUser = await PromisifiedQuery(`SELECT * FROM twitter_account WHERE twitter_id="${_escpe(twitterId)}"`)
                    .then((results) => {
                        return results[0] || { twitter_id: null }
                    });
                if (twitterUser.twitter_id != null) {
                    console.log("User exists");
                    if (twitterUser.username != username || twitterUser.profile_picutre != profilePicutre || twitterUser.display_name != displayName || twitterUser.token != token || twitterUser.tokenSecret != tokenSecret) {
                        await PromisifiedQuery(`UPDATE twitter_account SET 
                            username="${_escpe(username)}",
                            display_name="${_escpe(displayName)}",
                            profile_picutre="${_escpe(profilePicutre)}",
                            token="${_escpe(token)}",
                            tokenSecret="${_escpe(tokenSecret)}"
                        WHERE user_id="${_escpe(user.user_id)}"`).then(() => {
                            user = {
                                ...user,
                                username,
                                profile_picutre: profilePicutre,
                                token: token,
                                tokenSecret: tokenSecret,
                            }
                        })
                    }
                } else {
                    console.log("User does not exist");
                    await PromisifiedQuery(`INSERT IGNORE INTO twitter_account(user_id, twitter_id, username, display_name, profile_picutre, token, tokenSecret)
                        VALUES 
                    (
                        "${_escpe(user.user_id)}",
                        "${_escpe(twitterId)}",
                        "${_escpe(username)}",
                        "${_escpe(displayName)}",
                        "${_escpe(profilePicutre)}",
                        "${_escpe(token)}",
                        "${_escpe(tokenSecret)}"
                    )`).then((results) => {
                        console.log("User created");
                        user = {
                            user_id: user.user_id,
                            twitter_id: twitterId,
                            username,
                            display_name: displayName,
                            profile_picutre: profilePicutre,
                            token: token,
                            tokenSecret: tokenSecret,
                        }
                    })
                }

                console.log("User submitted");
                done(null, user);
            } else {

                done("twitter: Not logged in", null);
            }
        } catch (err) {
            console.log("Twitter Token Err");
            console.log(err);
            done(err, null);
        }
    }
));




// end
// discord
const { Util: { mergeDefault }, ClientOptions, Client, GatewayIntentBits, Partials } = require('discord.js');
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,

        // ...
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
})

function changeSupportedServers() {
    setInitialStoreValues()
    io.emit(`supported-servers-changed`, Store.supportedServers)

}
const { Client: ClientLight } = require('discord.js-light');

const { resourceLimits } = require('worker_threads');

class User extends ClientLight {
    constructor() {
        super(mergeDefault(
            ClientOptions,
            {
                cacheChannels: true,
                presence: { afk: true }
            }
        ));
    }
    async init(token) {
        let failed = false;
        await this.login(token).catch(() => {
            failed = true;
            this.destroy();
        });
        return failed ? null : this;
    }
};

function loginDiscord(token) {
    return new Promise(async (resolve, reject) => {
        let client = await new User().init(token);
        if (client) {
            resolve(client)
        } else {
            resolve(false)
        }
    })
}
PromisifiedQuery(`SELECT * FROM bot_users WHERE 1`).then(async (usersTokensDB) => {
    console.log('logging into dummy accounts');

    var promises = usersTokensDB.map((userTokenDB) => {
        return loginDiscord(userTokenDB.access_token)
    })
    Promise.all(promises).then((clients) => {
        console.log('done log into dummy accounts');
        for (let i = 0; i < clients.length; i++) {
            const client = clients[i];
            client.prependListener('message', async (msg) => {
                console.log(msg?.content);
                console.log('====================================');
            });
            client.on('ready', async () => {
                console.log(`${client.user.tag} is ready`);
            });
        }
    })
})

console.log('logging into bot');
bot.login(process.env.BOT_TOKEN);
bot.on('ready', async () => {
    console.log(`${bot.user.tag} is ready`);
    changeSupportedServers()
});
bot.on('guildCreate', async (guild) => {
    console.log(guild);
    await PromisifiedQuery(`INSERT IGNORE INTO servers_added (server_id, server_name) VALUES ("${_escpe(guild.id)}","${_escpe(guild.name)}")`)
    changeSupportedServers()
});
bot.on('guildDelete', async (guild) => {
    await PromisifiedQuery(`DELETE FROM servers_added WHERE server_id="${_escpe(guild.id)}"`)
    changeSupportedServers()
});
bot.on('guildUpdate', async (guildOld, guildNew) => {
    await PromisifiedQuery(`DELETE FROM servers_added WHERE server_id="${_escpe(guildNew.id)}"`)
    await PromisifiedQuery(`INSERT IGNORE INTO servers_added (server_id, server_name) VALUES ("${_escpe(guildNew.id)}","${_escpe(guildNew.name)}")`)
    changeSupportedServers()
});


bot.on("guildMemberAdd", async (member) => {
    updateUsernamesMessagesDiscord(member.user)

})
bot.on("userUpdate", async (userOld, userNew) => {
    updateUsernamesMessagesDiscord(userNew)

})

bot.on("guildMemberUpdate", async (memberOld, memberNew) => {
    updateUsernamesMessagesDiscord(memberNew.user)


})
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

function createMessage(message) {
    updateUsernamesMessagesDiscord(message.author)

    return new Promise((resolve, reject) => {
        if (!message.system) {

            var author = message.author
            var msgDiscordId = message.id
            var msgId = uuid()
            var channelId = message.channelId
            var guildId = message.guildId
            var authorId = author.id
            var authorAvatar = author.avatar != null ? `https://cdn.discordapp.com/avatars/${authorId}/${author.avatar}.png` : author.defaultAvatarURL
            var authorName = author.tag
            var msgContent = message.content
            var msgUrl = message.url
            var msgAttachements = [...message.attachments].map(e => e[1])
            var msgCreatedTimestamp = message.createdTimestamp
            var promises = []
            promises.push(PromisifiedQuery(`INSERT IGNORE INTO discord_msgs_found (
                discord_msg_id,
                msg_id,
                msg_channel_id,
                msg_guild_id,
                discord_user_id,
                discord_user_avatar,
                discord_user_tag,
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
                "${_escpe(formatDate(new Date(new Date().toLocaleString("en-US", { timeZone: "GMT" }))))}"
            )`))
            for (let i = 0; i < msgAttachements.length; i++) {
                const msgAttachement = msgAttachements[i];
                promises.push(PromisifiedQuery(`INSERT IGNORE INTO discord_msgs_attachements (
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
                var dataToSend = {
                    discord_msg_id: msgDiscordId,
                    msg_id: msgId,
                    msg_channel_id: channelId,
                    msg_guild_id: guildId,
                    discord_user_id: authorId,
                    discord_user_avatar: authorAvatar,
                    discord_user_tag: authorName,
                    msg_content: msgContent,
                    msg_url: msgUrl,
                    created_time_stamp: msgCreatedTimestamp,
                    attachments: msgAttachements.map(item => {
                        return {
                            attachement_url: item.url,
                            width: item.width,
                            height: item.height
                        }
                    })
                }
                resolve(dataToSend)
            })
        }
    })
}

bot.on('messageCreate', async (message) => {
    var channelId = message.channelId
    var guildId = message.guildId

    createMessage(message).then((data) => {

        io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageCreate" })
    })
});
function updateUsernamesMessagesDiscord(user = {}) {
    var userId = user.id
    if (userId == null) {
        return
    }
    var userTag = user.tag
    var userAvatar = user.avatar != null ? `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png` : user.defaultAvatarURL
    PromisifiedQuery(`UPDATE discord_msgs_found SET discord_user_avatar="${_escpe(userAvatar)}",discord_user_tag="${_escpe(userTag)}" WHERE discord_user_id="${_escpe(userId)}" AND (discord_user_avatar != "${_escpe(userAvatar)}" OR discord_user_tag != "${_escpe(userTag)}")`)
    PromisifiedQuery(`UPDATE users SET discord_avatar="${_escpe(userAvatar)}",username="${_escpe(userTag)}" WHERE discord_id="${_escpe(userId)}" AND (discord_avatar != "${_escpe(userAvatar)}" OR username != "${_escpe(userTag)}")`)

}
function deleteMessage(message) {
    updateUsernamesMessagesDiscord(message.author)
    return new Promise(async (resolve, reject) => {
        var msgDiscordId = message.id
        var channelId = message.channelId
        var guildId = message.guildId
        var promises = []
        var data = await PromisifiedQuery(`SELECT * FROM discord_msgs_found WHERE discord_msg_id="${_escpe(msgDiscordId)}" AND msg_channel_id="${_escpe(channelId)}" AND msg_guild_id="${_escpe(guildId)}"`).then((results) => results[0])
        promises.push(PromisifiedQuery(`DELETE FROM discord_msgs_found WHERE discord_msg_id="${_escpe(msgDiscordId)}" AND msg_channel_id="${_escpe(channelId)}" AND msg_guild_id="${_escpe(guildId)}"`))
        promises.push(PromisifiedQuery(`DELETE FROM discord_msgs_attachements WHERE msg_id="${_escpe(data.msg_id)}"`))
        Promise.all(promises).then(() => {
            resolve()
        })
    })
}

bot.on('messageDelete', async (message) => {
    var channelId = message.channelId
    var guildId = message.guildId

    deleteMessage(message).then(() => {
        io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageDelete" })
    })
});
bot.on('messageUpdate', async (message) => {
    var channelId = message.channelId
    var guildId = message.guildId

    deleteMessage(message).then(() => {
        createMessage(message).then((data) => {
            io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageUpdate" })
        })
    })
});
bot.on("guildMemberUpdate", (oldMember, newMember) => {
    changeSupportedServers()
});


// end
// discordstrategy
const DiscordStrategy = require("passport-discord").Strategy;
passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CLIENT_REDIRECT_DISCORD,
            scope: ["identify", "email", "guilds", "messages.read"],
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
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
                    await PromisifiedQuery(`INSERT IGNORE INTO users(user_id, username, discord_avatar, email, discord_id)
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
    done(null, user_id);
});

passport.deserializeUser(async (userId, done) => {
    var { user_id, email, username, discord_id, discord_avatar } = await PromisifiedQuery(`SELECT * FROM users WHERE user_id="${_escpe(userId)}"`).then((results) => results[0] || { user_id: null });
    var user = { user_id, email, username, discord_id, discord_avatar }
    if (user.user_id != null) done(null, user);
});
const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);


// end
const authRoute = require('./routes/auth');
const { supportedServers } = require('./modules/Store.js');
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

app.use(express.static(path.join(__dirname, 'static')));

app.use(passport.initialize());
app.use(passport.session());




app.use('/auth', authRoute);
app.get("/login", checkNotAuth, function (req, res) {
    res.sendFile(path.join(__dirname, 'static/website.html'));
})
app.get("/*", checkAuth, function (req, res) {
    res.sendFile(path.join(__dirname, 'static/website.html'));
})


const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io/", "https://dashboard.penguplatform.com/"],
        credentials: true

    }
});
io.attach(httpsServer)
io.use(wrap(sessionMiddleware));
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
console.log("get rules");

appOnlyClient.v2.streamRules().then((rules) => {
    if ((rules?.data || [])?.length != 0) {
        console.log("update rules");

        appOnlyClient.v2.updateStreamRules({
            delete: {
                ids: rules.data?.map((ruleToAdd) => {
                    return ruleToAdd.id
                }) || []
            },
        })
    }
})
io.on("connection", async (socket) => {
    setInitialStoreValues()
    const userId = socket.request.session.passport.user || null
    var { user_id, email, username, discord_id, discord_avatar } = await PromisifiedQuery(`SELECT * FROM users WHERE user_id="${_escpe(userId)}"`).then((results) => results[0] || { user_id: null });
    var user = { user_id, email, username, discord_id, discord_avatar }
    var userData = await getDataWithoutTasks(user)
    var { twitterAcc } = userData
    if (twitterAcc.twitter_id != null) {
        var consumer_key = process.env.TWITTER_CONSUMER_KEY
        var consumer_secret = process.env.TWITTER_CONSUMER_SECRET
        var twitterAccessToken = twitterAcc.token
        var twitterAccessSecret = twitterAcc.tokenSecret
        var userClient = new TwitterApi({
            appKey: consumer_key,
            appSecret: consumer_secret,
            accessToken: twitterAccessToken,
            accessSecret: twitterAccessSecret,
        })


    }
    socket.emit("connected", {
        reason: "connected",
        data: {
            userData: { ...userData, loading: true },
            supportedServers: Store.supportedServers,
        },
    });

    getData(userData, userClient).then(async (userData1) => {

        userData = userData1
        var { tasks } = userData
        var monitoredItemsTwitter = []
        var monitoredItemsDiscord = []
        var monitoredItemsOpensea = []

        tasks.forEach(task => {
            var monitoredItems = task.monitoredItems
            monitoredItemsTwitter.push(...monitoredItems.twitter)
            monitoredItemsDiscord.push(...monitoredItems.discord)
            monitoredItemsOpensea.push(...monitoredItems.opensea)
        });
        var alreadyJoinedTwitter = []
        var alreadyJoinedDiscord = []
        var alreadyJoinedOpensea = []
        for (let i = 0; i < monitoredItemsTwitter.length; i++) {
            const twitterTask = monitoredItemsTwitter[i]
            if (alreadyJoinedTwitter.filter(e => e == twitterTask.handle).length == 0) {
                alreadyJoinedTwitter.push(twitterTask.handle)
            } else {
                continue
            }
            socket.join(`twitter_${twitterTask.handle}`)

        }
        socket.emit("userData-changed", { reason: "getData", data: userData1 })

        if (monitoredItemsTwitter.length != 0 && userData.twitterAcc.twitter_id != null) {
            // function replaceRules(handlesToAdd) {
            //     return new Promise(async (resolve, reject) => {
            //         console.log("get rules");

            //         const rules = await appOnlyClient.v2.streamRules();

            //         // Add our rules
            //         var rulesToAdd = [""]
            //         var rulesEdittedIndex = 0
            //         for (let i = 0; i < handlesToAdd.length; i++) {
            //             const handleToAdd = handlesToAdd[i];
            //             if (rulesToAdd[rulesEdittedIndex].length < 512) {
            //                 if (rulesToAdd[rulesEdittedIndex] == "") {
            //                     rulesToAdd[rulesEdittedIndex] = `from:${handleToAdd}`
            //                 } else {
            //                     rulesToAdd[rulesEdittedIndex] += ` OR from:${handleToAdd}`
            //                 }
            //             } else {
            //                 rulesEdittedIndex++
            //                 rulesToAdd[rulesEdittedIndex] = ""
            //                 i--
            //                 continue
            //             }
            //         }
            //         var options = null
            //         if (rulesToAdd?.filter(e => e != "")?.length != 0) {
            //             if (options == null) {
            //                 options = {}
            //             }
            //             options = {
            //                 add: rulesToAdd?.filter(e => e != "").map((ruleToAdd) => {
            //                     return {
            //                         value: ruleToAdd
            //                     }
            //                 }),

            //             }
            //         }
            //         if (rules.data?.length) {
            //             if (options == null) {
            //                 options = {}
            //             }

            //             options.delete = {
            //                 ids: rules.data.map((ruleToAdd) => {
            //                     return ruleToAdd.id
            //                 })
            //             }
            //         }
            //         if (options != null) {
            //             console.log("update rules");

            //             await appOnlyClient.v2.updateStreamRules(options)
            //         }
            //         resolve()
            //     })
            // }
            socket.on("disconnect", async (action) => {
                console.log('====================================');
                console.log(action);
                console.log('====================================');
                // var allTwitterSockets = [...io.sockets.adapter.rooms].map(item => item[0]).filter(e => e.indexOf("twitter_") != -1)
                // var handlesToAdd = [...new Set(...allTwitterSockets.map(e => e.split("_")[1]))]
                // await replaceRules(handlesToAdd)
            });
            // var handlesFromRules = []
            // var handlesToAdd = [...new Set([...alreadyJoinedTwitter, ...handlesFromRules])]s
            var streamInterval = setInterval(() => {
                if (socket.connected) {
                    getData(userData, userClient).then((userData1) => {
                        socket.emit("userData-changed", { reason: "twitterStream", data: userData1 })
                    })
                } else {
                    clearInterval(streamInterval)
                }
            }, 3000);
            // replaceRules(handlesToAdd).then(() => {
            //     //stream
            //     console.log('====================================');
            //     console.log("start stream");
            //     console.log('====================================');
            //     async function tryConnection(time = 0) {
            //         if (socket.connected) {
            //             try {
            //                 return appOnlyClient.v2.searchStream({
            //                     "tweet.fields": ["attachments", "referenced_tweets", "text", "created_at", "public_metrics", "author_id"],
            //                     "user.fields": ["verified", "profile_image_url", "name"],
            //                     "expansions": ["author_id", "entities.mentions.username", "attachments.poll_ids"],

            //                 }).catch(async (err) => {
            //                     console.log(err)
            //                     await new Promise(resolve => setTimeout(resolve, 2000)) // sleep 5 seconds

            //                     return tryConnection(++time)
            //                 });

            //             } catch (err) {
            //                 console.log(err)
            //                 await new Promise(resolve => setTimeout(resolve, 2000)) // sleep 5 seconds
            //                 return tryConnection(++time)

            //             }
            //         } else {
            //             return "errored"
            //         }
            //     }
            //     tryConnection().then((stream) => {
            //         if (stream != "errored") {

            //             stream.autoReconnect = true;

            //             stream.on(ETwitterStreamEvent.Data, async tweet => {
            //                 var userTweeted = tweet.includes.users.filter(e => e.id == tweet.data.author_id)[0]
            //                 var tweetData = tweet.data
            //                 io.to(`twitter_${userTweeted.username}`).emit("data-monitored", { data: tweetData, reason: "twitter-stream-triggered" })
            //             });
            //         }

            //     })
            //     // Enable auto reconnect

            // })


        }
        for (let i = 0; i < monitoredItemsDiscord.length; i++) {
            const discordTask = monitoredItemsDiscord[i]
            if (alreadyJoinedDiscord.filter(e => e.guild_id == discordTask.guild_id && e.channel_id == discordTask.channel_id).length == 0) {
                alreadyJoinedDiscord.push(discordTask)
            } else {
                continue
            }

            socket.join(`discord_${discordTask.guild_id}_${discordTask.channel_id}`)
        }
        for (let i = 0; i < monitoredItemsOpensea.length; i++) {
            const openseaTask = monitoredItemsOpensea[i]
            if (alreadyJoinedOpensea.filter(e => e == openseaTask.collection_name).length == 0) {
                alreadyJoinedOpensea.push(openseaTask.collection_name)
            } else {
                continue
            }

            socket.join(`opensea_${openseaTask.collection_name}`)

        }


        socket.on("create-task", async (action) => {
            var taskId = uuid()
            var type = action.type || null
            var data = action.data
            var taskName = action.name
            var twitterTasks = data.twitter || []
            var discordTasks = data.discord || []
            var openseaTasks = data.opensea || []
            var promises = []
            promises.push(await PromisifiedQuery(`INSERT IGNORE INTO tasks (user_id, task_id, name, type) 
            VALUES 
            (
                "${_escpe(userId)}",
                "${_escpe(taskId)}",
                "${_escpe(taskName)}",
                "${_escpe(type)}"
            )`))

            for (let i = 0; i < twitterTasks.length; i++) {
                var twitterTask = twitterTasks[i];
                var { handle, retweets, quote_tweets } = twitterTask
                var type_twitter = twitterTask.type
                var monitoredId = uuid()
                var twitterUser = await getTwitterUserData(handle, userClient).then(result => result.data)
                if (twitterUser?.id != undefined) {
                    promises.push(PromisifiedQuery(`INSERT IGNORE INTO monitored_items_twitter (task_id, monitored_id, handle, retweets, quote_tweets, type) 
                VALUES 
                (
                    "${_escpe(taskId)}",
                    "${_escpe(monitoredId)}",
                    "${_escpe(handle)}",
                    "${_escpe(retweets)}",
                    "${_escpe(quote_tweets)}",
                    "${_escpe(type_twitter)}"
                ) `))
                    socket.join(`twitter_${handle}`)
                }

            }
            for (let i = 0; i < discordTasks.length; i++) {
                var discordTask = discordTasks[i];
                var { channel_id, guild_id } = discordTask
                var server_details = supportedServers.filter(e => e.id == guild_id)[0] || {}
                var monitoredId = uuid()
                promises.push(PromisifiedQuery(`INSERT IGNORE INTO monitored_items_discord (task_id, monitored_id, channel_id, guild_id) 
                VALUES 
                (
                    "${_escpe(taskId)}",
                    "${_escpe(monitoredId)}",
                    "${_escpe(channel_id)}",
                    "${_escpe(guild_id)}"
                ) `))
                socket.join(`discord_${guild_id}_${channel_id}`)

            }
            for (let i = 0; i < openseaTasks.length; i++) {
                var openseaTask = openseaTasks[i];
                var { collection_name } = openseaTask
                var type_opensea = openseaTask.type
                var monitoredId = uuid()
                promises.push(PromisifiedQuery(`INSERT IGNORE INTO monitored_items_opensea (task_id, monitored_id, collection_name, type) 
                VALUES 
                (
                    "${_escpe(taskId)}",
                    "${_escpe(monitoredId)}",
                    "${_escpe(collection_name)}",
                    "${_escpe(type_opensea)}"
                ) `))
                socket.join(`opensea_${collection_name}`)

            }
            await Promise.all(promises)
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "create-task", data: userData1 })
                socket.emit("task-created", taskId)
                userData = userData1
            })
        })
        socket.on("change-task-name", async (action) => {
            var taskId = action.taskId
            await PromisifiedQuery(`UPDATE tasks SET name="${_escpe(action.taskName)}" WHERE task_id="${_escpe(taskId)}"`)
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "change-task-name", data: userData1 })
                userData = userData1
            })

        })
        socket.on("delete-task", async (action) => {
            var taskId = action.taskId
            var type = action.type || null
            var data = action.data

            await PromisifiedQuery(`DELETE FROM tasks WHERE task_id="${_escpe(taskId)}"`)
            var monitoredTwitterItems = await PromisifiedQuery(`SELECT * FROM monitored_items_twitter WHERE task_id="${_escpe(taskId)}"`)
            await PromisifiedQuery(`DELETE FROM monitored_items_twitter WHERE task_id="${_escpe(taskId)}"`)
            var monitoredDiscordItems = await PromisifiedQuery(`SELECT * FROM monitored_items_discord WHERE task_id="${_escpe(taskId)}"`)
            await PromisifiedQuery(`DELETE FROM monitored_items_discord WHERE task_id="${_escpe(taskId)}"`)
            var monitoredOpenseaItems = await PromisifiedQuery(`SELECT * FROM monitored_items_opensea WHERE task_id="${_escpe(taskId)}"`)
            await PromisifiedQuery(`DELETE FROM monitored_items_opensea WHERE task_id="${_escpe(taskId)}"`)



            for (let i = 0; i < monitoredDiscordItems.length; i++) {
                const monitoredDiscordItem = monitoredDiscordItems[i];
                var { channel_id, guild_id } = monitoredDiscordItem
                socket.leave(`discord_${guild_id}_${channel_id}`)
            }
            for (let i = 0; i < monitoredTwitterItems.length; i++) {
                const monitoredTwitterItem = monitoredTwitterItems[i];
                var handle = monitoredTwitterItem.handle
                socket.leave(`twitter_${handle}`)

            }
            for (let i = 0; i < monitoredOpenseaItems.length; i++) {
                const monitoredOpenseaItem = monitoredOpenseaItems[i];
                var collection_name = monitoredOpenseaItem.collection_name
                socket.leave(`opensea_${collection_name}`)
            }
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "delete-task", data: userData1 })
                userData = userData1
            })
        })
        socket.on("add-monitored-item", async (action) => {
            var monitoredId = uuid()
            var taskId = action.task_id
            var type = action.type
            var data = action.data
            var allSockets = [...io.sockets.adapter.rooms].map(item => item[0])

            if (type == "twitter") {
                var { handle, retweets, quote_tweets } = data
                var type_twitter = data.type
                var twitterUser = await getTwitterUserData(handle, userClient).then(result => result.data)

                if (twitterUser?.id != undefined) {
                    await PromisifiedQuery(`INSERT IGNORE INTO monitored_items_twitter (task_id, monitored_id, handle, retweets, quote_tweets, type) 
                VALUES 
                (
                    "${_escpe(taskId)}",
                    "${_escpe(monitoredId)}",
                    "${_escpe(handle)}",
                    "${_escpe(retweets)}",
                    "${_escpe(quote_tweets)}",
                    "${_escpe(type_twitter)}"
    
                ) `)
                    socket.join(`twitter_${handle}`)
                }
            } else if (type == "discord") {
                var { guild_id, channel_id } = data

                var server_details = supportedServers.filter(e => e.id == data.guild_id)[0] || {}
                await PromisifiedQuery(`INSERT IGNORE INTO monitored_items_discord (task_id, monitored_id, channel_id, guild_id) 
            VALUES 
            (
                "${_escpe(taskId)}",
                "${_escpe(monitoredId)}",
                "${_escpe(channel_id)}",
                "${_escpe(guild_id)}"
            ) `)
                socket.join(`discord_${guild_id}_${channel_id}`)
            } else if (type == "opensea") {
                var { collection_name } = data
                var type_opensea = data.type
                await PromisifiedQuery(`INSERT IGNORE INTO monitored_items_opensea (task_id, monitored_id, collection_name, type) 
            VALUES 
            (
                "${_escpe(taskId)}",
                "${_escpe(monitoredId)}",
                "${_escpe(collection_name)}",
                "${_escpe(type_opensea)}"
            ) `)
                socket.join(`opensea_${collection_name}`)
            }
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "add-monitored-item", data: userData1 })
                userData = userData1
            })

        })

        socket.on("delete-monitored-item", async (action) => {
            var monitoredId = action.monitoredId
            var taskId = action.taskId
            var type = action.type || null
            var data = await PromisifiedQuery(`SELECT * FROM monitored_items_${_escpe(type)} WHERE task_id="${_escpe(taskId)}" AND monitored_id="${_escpe(monitoredId)}"`).then((results) => results[0])
            await PromisifiedQuery(`DELETE FROM monitored_items_${_escpe(type)} WHERE task_id="${_escpe(taskId)}" AND monitored_id="${_escpe(monitoredId)}"`)
            if (type == "discord") {
                var { guild_id, channel_id } = data
                socket.leave(`discord_${guild_id}_${channel_id}`)
            } else if (type == "opensea") {
                var { collection_name } = data
                socket.leave(`opensea_${collection_name}`)
            } else if (type == "twitter") {
                var { handle } = data
                socket.leave(`twitter_${handle}`)
            }
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "delete-monitored-item", data: userData1 })
                userData = userData1
            })

        })
        socket.on("get-supported-servers", action => {
            socket.emit("supported-servers-changed", Store.supportedServers)
        })
        socket.on("get-data", action => {
            console.log(action);
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "get-data", data: userData1 })
                userData = userData1
            })
        })
        socket.on("req-data-monitored", action => {
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "res-data-monitored", data: userData1, ogData: action })
                userData = userData1
            })
        })
    })

});
async function setInitialStoreValues() {
    const Guilds = [...bot.guilds.cache].map(e => e[1])
    var supportedServers = await PromisifiedQuery(`SELECT * FROM servers_added WHERE activate="true"`)
    Store.supportedServers = Guilds.map(supportedServer => {
        var nonCategoryChannel = [...supportedServer.channels.cache].map(e => e[1]).filter(e => e.constructor.name != "CategoryChannel").filter(e => e.viewable == true)
        return {
            id: supportedServer.id,
            name: supportedServer.name,
            icon: `https://cdn.discordapp.com/icons/${supportedServer.id}/${supportedServer.icon}.webp`,
            nameAcronym: supportedServer.nameAcronym,
            channels: nonCategoryChannel.map(e => {
                return {
                    id: e.id,
                    name: e.name
                }
            })
        }
    }).filter(server => supportedServers.filter(supportedServer => server.id == supportedServer.server_id).length > 0)
    Store.verifiedUsers = bot.guilds.cache.get(server_id)?.roles?.cache?.get(verified_role_id)?.members?.map(m => m.user.tag) || [];

}
instrument(io, {
    auth: false
});

httpsServer.listen(443);
httpServer.listen(isDev___ ? 3000 : 80);