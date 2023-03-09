const express = require('express');
const http = require("http");
var path = require('path');
var cors = require("cors")
const https = require("https");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const opensea = require("opensea-js");

const { OpenSeaStreamClient } = require("@opensea/stream-js");
const { WebSocket } = require("ws");

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
                    if (user.user_id != twitterUser.user_id || twitterUser.username != username || twitterUser.profile_picutre != profilePicutre || twitterUser.display_name != displayName || twitterUser.token != token || twitterUser.tokenSecret != tokenSecret) {
                        await PromisifiedQuery(`UPDATE twitter_account SET 
                            user_id="${_escpe(user.user_id)}",
                            username="${_escpe(username)}",
                            display_name="${_escpe(displayName)}",
                            profile_picutre="${_escpe(profilePicutre)}",
                            token="${_escpe(token)}",
                            tokenSecret="${_escpe(tokenSecret)}"
                        WHERE user_id="${_escpe(twitterUser.user_id)}"`).then(() => {
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
const { Util: { mergeDefault }, ClientOptions } = require('discord.js');
const { Client, GatewayIntentBits, Partials } = require('discord.jsOg');
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,

        // ...
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User],
})

function changeSupportedServers() {
    return new Promise(async (resolve, reject) => {
        await setInitialStoreValues()
        io.emit(`supported-servers-changed`, Store.supportedServers)
        resolve(Store.supportedServers)
    })

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
    init(token) {
        return new Promise(async (resolve, reject) => {
            let failed = false;
            await this.login(token).catch(() => {
                failed = true;
                this.destroy();
            });
            resolve(failed ? null : this)
        })
    }
};

function loginDiscord(token) {
    return new Promise(async (resolve, reject) => {
        let client = await new User().init(token);
        if (client) {
            client.on('ready', async () => {
                console.log(`${client.user.tag} is ready`);
                PromisifiedQuery(`UPDATE bot_users SET username='${_escpe(client.user.tag)}' WHERE access_token="${_escpe(token)}"`)
                resolve(client)
            });
        } else {
            resolve(false)
        }
    })
}
var botsClient = []
var initializedBot = false
var initialized = false
PromisifiedQuery(`SELECT * FROM bot_users WHERE activated="true"`).then(async (usersTokensDB) => {
    console.log('logging into dummy accounts');

    var promises = usersTokensDB.map((userTokenDB) => {
        return loginDiscord(userTokenDB.access_token)
    })
    Promise.all(promises).then((clients) => {
        console.log('done log into dummy accounts');
        for (let i = 0; i < clients.length; i++) {
            const client = clients[i];
            if (client != false) {
                botsClient.push(client)
                client.prependListener('message', async (message) => {
                    if (message.channel.type != "dm") {
                        var channelId = message.channelId || message.channel?.id
                        var guildId = message.guildId || message.guild?.id

                        createMessage(message).then((data) => {
                            io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageCreate" })
                        })
                    }
                });
                client.on('messageDelete', async (message) => {
                    var channelId = message.channelId || message.channel?.id
                    var guildId = message.guildId || message.guild?.id

                    deleteMessage(message).then(() => {
                        io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageDelete" })
                    })
                });
                client.on('messageUpdate', async (messageOld, messageNew) => {
                    var channelId = messageNew.channelId || messageNew.channel?.id
                    var guildId = messageNew.guildId || messageNew.guild?.id
                    var messageOldSaved = await PromisifiedQuery(`SELECT * FROM discord_msgs_found WHERE msg_guild_id="${_escpe(guildId)}" AND  msg_channel_id="${_escpe(channelId)}" AND discord_msg_id="${_escpe(messageNew.id)}"`).then((res) => res[0] || messageNew)
                    if (Number(messageOldSaved.edited_time_stamp) != messageNew.editedTimestamp) {
                        deleteMessage(messageNew).then(() => {
                            createMessage(messageNew).then((data) => {
                                io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageUpdate" })
                            })
                        })
                    }
                });
                client.on('guildCreate', async (guild) => {
                    await PromisifiedQuery(`INSERT IGNORE INTO servers_added (server_id, server_name) VALUES ("${_escpe(guild.id)}","${_escpe(guild.name)}")`)
                    changeSupportedServers()
                });
                client.on('guildDelete', async (guild) => {
                    var availableGuilds = getAvailableGuilds()
                    if (availableGuilds.filter(e => e.id == guild.id).length != 0) {
                        return
                    }
                    await PromisifiedQuery(`DELETE FROM servers_added WHERE server_id="${_escpe(guild.id)}"`)
                    changeSupportedServers()
                });
                client.on('guildUpdate', async (guildOld, guildNew) => {
                    await PromisifiedQuery(`DELETE FROM servers_added WHERE server_id="${_escpe(guildNew.id)}"`)
                    await PromisifiedQuery(`INSERT IGNORE INTO servers_added (server_id, server_name) VALUES ("${_escpe(guildNew.id)}","${_escpe(guildNew.name)}")`)
                    changeSupportedServers()
                });
                client.on("guildMemberAdd", async (member) => {
                    updateUsernamesMessagesDiscord(member.user)
                })
                client.on("userUpdate", async (userOld, userNew) => {
                    updateUsernamesMessagesDiscord(userNew)
                })
                client.on("guildMemberUpdate", async (memberOld, memberNew) => {
                    updateUsernamesMessagesDiscord(memberNew.user)
                })
            }
        }
        initialized = true
        if (initializedBot == true) {
            changeSupportedServers()
        }
    })
    if (promises.length == 0) {
        initialized = true
        if (initializedBot == true) {
            changeSupportedServers()
        }

    }
})

console.log('logging into bot');
bot.login(process.env.BOT_TOKEN);
bot.on('ready', async () => {
    console.log(`${bot.user.tag} is ready`);
    botsClient.push(bot)
    initializedBot = true
    if (initialized == true) {
        changeSupportedServers()
    }

});
bot.on('guildCreate', async (guild) => {
    await PromisifiedQuery(`INSERT IGNORE INTO servers_added (server_id, server_name) VALUES ("${_escpe(guild.id)}","${_escpe(guild.name)}")`)
    changeSupportedServers()
});
bot.on('guildDelete', async (guild) => {
    var availableGuilds = getAvailableGuilds()
    if (availableGuilds.filter(e => e.id == guild.id).length != 0) {
        return
    }
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
            var channelId = message.channelId || message.channel?.id
            var guildId = message.guildId || message.guild?.id
            var authorId = author.id
            var authorAvatar = author.avatar != null ? `https://cdn.discordapp.com/avatars/${authorId}/${author.avatar}.png` : author.defaultAvatarURL
            var authorName = author.tag
            var msgContent = message.content
            var msgUrl = message.url
            var msgAttachements = [...message.attachments].map(e => e[1])
            var msgCreatedTimestamp = message.createdTimestamp
            var msgEditedTimestamp = message.editedTimestamp
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
                ${msgEditedTimestamp ? ',edited_time_stamp' : ""}
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
                ${msgEditedTimestamp ? ',"' + _escpe(msgEditedTimestamp) + '"' : ""}
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
    var channelId = message.channelId || message.channel?.id
    var guildId = message.guildId || message.guild?.id

    createMessage(message).then((data) => {

        io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageCreate" })
    })
});
function updateUsernamesMessagesDiscord(user = {}) {
    var userId = user?.id || null
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
        var channelId = message.channelId || message.channel?.id
        var guildId = message.guildId || message.guild?.id
        var promises = []
        var data = await PromisifiedQuery(`SELECT * FROM discord_msgs_found WHERE discord_msg_id="${_escpe(msgDiscordId)}" AND msg_channel_id="${_escpe(channelId)}" AND msg_guild_id="${_escpe(guildId)}"`).then((results) => results[0] || {})
        promises.push(PromisifiedQuery(`DELETE FROM discord_msgs_found WHERE discord_msg_id="${_escpe(msgDiscordId)}" AND msg_channel_id="${_escpe(channelId)}" AND msg_guild_id="${_escpe(guildId)}"`))
        promises.push(PromisifiedQuery(`DELETE FROM discord_msgs_attachements WHERE msg_id="${_escpe(data.msg_id)}"`))
        Promise.all(promises).then(() => {
            resolve()
        })
    })
}

bot.on('messageDelete', async (message) => {
    var channelId = message.channelId || message.channel?.id
    var guildId = message.guildId || message.guild?.id

    deleteMessage(message).then(() => {
        io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageDelete" })
    })
});
bot.on('messageUpdate', async (messageOld, messageNew) => {
    var channelId = messageNew.channelId || messageNew.channel?.id
    var guildId = messageNew.guildId || messageNew.guild?.id

    var messageOldSaved = await PromisifiedQuery(`SELECT * FROM discord_msgs_found WHERE msg_guild_id="${_escpe(guildId)}" AND  msg_channel_id="${_escpe(channelId)}" AND discord_msg_id="${_escpe(messageNew.id)}"`).then((res) => res[0] || messageNew)
    if (Number(messageOldSaved.edited_time_stamp) != messageNew.editedTimestamp) {
        deleteMessage(messageNew).then(() => {
            createMessage(messageNew).then((data) => {
                io.to(`discord_${guildId}_${channelId}`).emit("data-monitored", { type: "discord", guildId, channelId, reason: "messageUpdate" })
            })
        })
    }
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
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001',],
}))
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

if (isDev___ == false) {
    app.all("*", function (req, res, next) {
        console.log('req start: ', req.secure, req.hostname, req.originalurl, app.get('port'));
        if (req.secure) {
            return next();
        }

        res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.originalurl);
    });

}

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const io = new Server(httpServer, {
    cors: isDev___ == false ? {
        origin: ["https://admin.socket.io/", "https://dashboard.penguplatform.com/"],
        credentials: true

    } : {
        origin: "*",
        methods: ["GET", "POST"],
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
// console.log("get rules");

// appOnlyClient.v2.streamRules().then((rules) => {
//     if ((rules?.data || [])?.length != 0) {
//         console.log("update rules");

//         appOnlyClient.v2.updateStreamRules({
//             delete: {
//                 ids: rules.data?.map((ruleToAdd) => {
//                     return ruleToAdd.id
//                 }) || []
//             },
//         })
//     }
// })

const OpenseaClient = new OpenSeaStreamClient({
    token: process.env.OPENSEA_API_KEY,
    network: process.env.USED_NET == "GOERLI" ? "testnet" : "mainnet",
    connectOptions: {
        transport: WebSocket,
    },
});
var monitoredOpenSeaCollections = {

}
function trackOpenseaCollection(collection_name) {
    if (monitoredOpenSeaCollections[`opensea_${collection_name}`] == null || monitoredOpenSeaCollections[`opensea_${collection_name}`] == undefined) {
        monitoredOpenSeaCollections[`opensea_${collection_name}`] = OpenseaClient.onEvents(
            collection_name,
            [
                "item_metadata_updated",// nft minted or updated
                // "item_listed", //we listed the item (httinah bach itba3)
                "item_sold", // b3na nft lxi wa7d
                "item_transferred",// siftna nft lxiwa7d
            ],
            (event) => {
                io.to(`opensea_${collection_name}`).emit("data-monitored", { type: "opnesea", collectionName: collection_name, reason: "openseaCollectionEvent", event })
            }
        );

    }

}
function untrackOpenseaCollection(collection_name) {
    if (!(monitoredOpenSeaCollections[`opensea_${collection_name}`] == null || monitoredOpenSeaCollections[`opensea_${collection_name}`] == undefined)) {
        monitoredOpenSeaCollections[`opensea_${collection_name}`]()
        setTimeout(() => {

            monitoredOpenSeaCollections[`opensea_${collection_name}`] = null
        }, 200)
    }
}

io.on("connection", async (socket) => {
    await setInitialStoreValues()
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
    socket.on("disconnect", async (action) => {
        var rooms = [...io.sockets.adapter.rooms].map(e => e[0])
        var roomsFiltered = Object.keys(monitoredOpenSeaCollections).filter(e => monitoredOpenSeaCollections[e] != null).filter(e => rooms.indexOf(e) == -1)
        for (let i = 0; i < roomsFiltered.length; i++) {
            var roomName = roomsFiltered[i];
            monitoredOpenSeaCollections[roomName]()
            monitoredOpenSeaCollections[roomName] = null
        }
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
            trackOpenseaCollection(openseaTask.collection_name)
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
                if (handle.trim() == "") {
                    continue
                }

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
                let discordTask = discordTasks[i];
                let { channel_id, guild_id } = discordTask
                let server_details = supportedServers.filter(e => e.id == guild_id)[0] || {}
                let monitoredId = uuid()
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
                let openseaTask = openseaTasks[i];
                let { collection_name } = openseaTask
                let type_opensea = openseaTask.type || "collection"
                let monitoredId = uuid()
                if (collection_name.trim() == "") {
                    continue
                }
                promises.push(PromisifiedQuery(`INSERT IGNORE INTO monitored_items_opensea (task_id, monitored_id, collection_name, type) 
                VALUES 
                (
                    "${_escpe(taskId)}",
                    "${_escpe(monitoredId)}",
                    "${_escpe(collection_name)}",
                    "${_escpe(type_opensea)}"
                ) `))
                socket.join(`opensea_${collection_name}`)
                trackOpenseaCollection(collection_name)


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

                if (twitterUser?.id != undefined && handle.trim() != "") {
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
                var type_opensea = data.type || "collection"
                if (collection_name.trim() != "") {
                    await PromisifiedQuery(`INSERT IGNORE INTO monitored_items_opensea (task_id, monitored_id, collection_name, type) 
                VALUES 
                (
                    "${_escpe(taskId)}",
                    "${_escpe(monitoredId)}",
                    "${_escpe(collection_name)}",
                    "${_escpe(type_opensea)}"
                ) `)
                    socket.join(`opensea_${collection_name}`)
                    trackOpenseaCollection(collection_name)
                }
            }
            getData(userData, userClient).then((userData1) => {
                socket.emit("userData-changed", { reason: "add-monitored-item", data: userData1 })
                userData = userData1
            })

        })
        socket.on("check-channel", async (action, callback) => {
            if (action.type != "discord") {
                return callback(null)
            }
            async function checkChannel(index = 0, callback) {
                try {
                    var { guild_id, channel_id } = action.data
                    var z = await botsClient[index].guilds.cache.get(guild_id).channels.fetch(channel_id)
                    var msgs = await z.messages.fetch()
                    callback(msgs)
                } catch (error) {
                    if (botsClient.length - 1 <= index) {
                        return callback("errored")
                    }
                    checkChannel(index + 1, callback)
                }
            }
            checkChannel(0, callback)
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
function getAvailableGuilds() {
    return new Promise(async (resolve, reject) => {
        var currentGuilds = await PromisifiedQuery(`SELECT * FROM servers_added WHERE 1`)
        var activatedBots = await PromisifiedQuery(`SELECT * FROM bot_users WHERE activated="true"`)
        const guildsBots = botsClient.map((botClient) => {
            if (activatedBots.filter(e => e.username == botClient.user.tag).length > 0 || botClient.user.bot == true) {
                return [...botClient.guilds.cache].map(e => e[1]).map(guild => {
                    var botClientViewableChannels = [...botClient.channels.cache].map(e => e[1]).filter(e => e.constructor.name == "TextChannel")
                    return {
                        ...guild,
                        channels_viewable: botClientViewableChannels.filter(channel => channel.guild.id == guild.id)
                    }
                })
            } else {
                return []
            }

        })
        var availableGuilds = []
        for (let i = 0; i < guildsBots.length; i++) {
            const guildsBot = guildsBots[i];
            guildsBot.forEach((guildBot) => {
                if (availableGuilds.filter(e => e.id == guildBot.id).length == 0) {
                    availableGuilds.push(guildBot)
                }
            })
        }
        // var needDeleteGuilds = currentGuilds.filter(currentGuild => availableGuilds.filter(availableGuild => availableGuild.id == currentGuild.server_id).length == 0)
        // var needDeletePromises = needDeleteGuilds.map((needDeleteGuild) => {
        //     return PromisifiedQuery(`DELETE FROM servers_added WHERE server_id="${_escpe(needDeleteGuild.server_id)}"`)
        // })
        var needAdditionGuilds = availableGuilds.filter(availableGuild => currentGuilds.filter(currentGuild => currentGuild.server_id == availableGuild.id).length == 0)
        var needAdditionPromises = needAdditionGuilds.map((needAdditionGuild) => {
            return PromisifiedQuery(`INSERT INTO servers_added(server_id, server_name, link) VALUES ("${_escpe(needAdditionGuild.id)}","${_escpe(needAdditionGuild.name)}","https://discord.com/channels/${_escpe(needAdditionGuild.id)}")`)
        })
        var needUpdateGuilds = availableGuilds.filter(availableGuild => currentGuilds.filter(currentGuild => currentGuild.server_id == availableGuild.id).length != 0)
        var needUpdatePromises = needUpdateGuilds.map((needUpdateGuild) => {
            return PromisifiedQuery(`UPDATE servers_added SET server_name="${_escpe(needUpdateGuild.name)}" WHERE server_id="${_escpe(needUpdateGuild.id)}"`)
        })

        Promise.all([
            // ...needDeletePromises,
            ...needAdditionPromises], needUpdatePromises).then(() => {
                resolve([...availableGuilds])
            })
    })
}
function setInitialStoreValues() {
    return new Promise(async (resolve, reject) => {
        var availableGuilds = await getAvailableGuilds()
        var supportedServers = await PromisifiedQuery(`SELECT * FROM servers_added WHERE activate="true"`)
        Store.supportedServers = availableGuilds.map(availableGuild => {
            var nonCategoryChannel = [...availableGuild.channels.cache].map(e => e[1]).filter(e => e.constructor.name != "CategoryChannel")
            return {
                id: availableGuild.id,
                name: availableGuild.name,
                icon: `https://cdn.discordapp.com/icons/${availableGuild.id}/${availableGuild.icon}.webp`,
                nameAcronym: availableGuild.nameAcronym,
                channels: nonCategoryChannel.map(e => {
                    return {
                        id: e.id,
                        name: e.name
                    }
                })
            }
        }).filter(server => supportedServers.filter(supportedServer => server.id == supportedServer.server_id).length > 0)
        Store.verifiedUsers = bot.guilds.cache.get(server_id)?.roles?.cache?.get(verified_role_id)?.members?.map(m => m.id) || [];
        resolve(Store)
    })

}
instrument(io, {
    auth: false
});

httpsServer.listen(443);
httpServer.listen(isDev___ ? 3000 : 80);