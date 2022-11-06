/* eslint-disable no-loop-func */
var db = require("../modules/db")

function getDataWithoutTasks(user1) {
    return new Promise(async (resolve, reject) => {
        var user = { ...user1 }
        var userId = user.user_id
        delete user.id
        var twitterAcc = await PromisifiedQuery(`SELECT * FROM twitter_account WHERE user_id="${_escpe(userId)}"`).then((res) => res[0] || { twitter_id: null })
        user.twitterAcc = twitterAcc

        resolve({ ...user })
    })

}
function getTwitterUserData(handle, userClient) {
    return new Promise((resolve, reject) => {

        userClient.v2.userByUsername(handle, { "user.fields": ["entities", "id", "name", "profile_image_url", "public_metrics", "url", "verified"] }).then((user) => {
            resolve(user)
        });
    })

}
function getAllTweets(userClient, options) {
    return new Promise((resolve, reject) => {
        function getAllTweets1(userClient, options, callback = null, pagination = null, collectedTweets = []) {
            var config = {
                start_time: options.start_time,
                max_results: 100,
                "tweet.fields": ["attachments", "referenced_tweets", "text", "created_at", "public_metrics"],
                "user.fields": ["verified", "profile_image_url", "name"]
            }
            if (pagination) {
                config.pagination_token = pagination
            }
            userClient.v2.userTimeline(options.user.id, config).then(timeline => {
                if (timeline.meta.next_token) {
                    getAllTweets1(userClient, options, callback, timeline.meta.next_token, [...collectedTweets, ...timeline.tweets])
                } else {
                    var tweets = [...collectedTweets, ...timeline.tweets]
                    if (callback) {
                        callback({
                            user: options.user,
                            tweets,
                            with_retweets_only: tweets.filter(tweet => tweet.referenced_tweets && tweet.referenced_tweets.filter(reference => reference.type == "quoted").length == 0),
                            with_quoted_only: tweets.filter(tweet => tweet.referenced_tweets && tweet.referenced_tweets.filter(reference => reference.type == "retweeted").length == 0),
                            tweets_only: tweets.filter(tweet => tweet.referenced_tweets == undefined || (tweet.referenced_tweets && tweet.referenced_tweets.filter(reference => reference.type == "retweeted").length == 0 && tweet.referenced_tweets.filter(reference => reference.type == "quoted").length == 0))
                        })
                    }
                }

            })
        }
        getAllTweets1(userClient, options, function (results) { resolve(results) })
    })

}
function getData(user1, userClient = false, cache = {}) {
    return new Promise(async (resolve, reject) => {
        var user = { ...user1 }
        var userId = user.user_id
        delete user.id
        var twitterAcc = await PromisifiedQuery(`SELECT * FROM twitter_account WHERE user_id="${_escpe(userId)}"`).then((res) => res[0] || { twitter_id: null })
        var tasks = await PromisifiedQuery(`SELECT * FROM tasks WHERE user_id="${_escpe(userId)}"`)
        var userMonitoredItemsTwitter = await PromisifiedQuery(`SELECT monitored_items_twitter.*, tasks.user_id FROM monitored_items_twitter, tasks WHERE
        tasks.task_id = monitored_items_twitter.task_id
        AND 
        tasks.user_id="${_escpe(userId)}"
        `)
        var monitoredItemsDiscord = await PromisifiedQuery(`SELECT tasks.user_id, monitored_items_discord.* FROM tasks, monitored_items_discord WHERE 
        tasks.task_id = monitored_items_discord.task_id 
        AND 
        tasks.user_id="${_escpe(userId)}"
        `)
        var monitoredItemsOpensea = await PromisifiedQuery(`SELECT tasks.user_id, monitored_items_opensea.* FROM tasks, monitored_items_opensea WHERE 
        tasks.task_id = monitored_items_opensea.task_id 
        AND
        tasks.user_id="${_escpe(userId)}"
        `)
        var discord_msgs = await PromisifiedQuery(`SELECT tasks.user_id, tasks.task_id, discord_msgs_found.* FROM tasks, monitored_items_discord, discord_msgs_found WHERE 
        tasks.task_id = monitored_items_discord.task_id 
        AND 
        tasks.user_id="${_escpe(userId)}"
        AND
        monitored_items_discord.channel_id = discord_msgs_found.msg_channel_id AND monitored_items_discord.guild_id = discord_msgs_found.msg_guild_id
        `)
        var discord_msgs_attachements = await PromisifiedQuery(`SELECT tasks.user_id, tasks.task_id, discord_msgs_found.msg_channel_id, discord_msgs_found.msg_guild_id, discord_msgs_attachements.* FROM tasks, monitored_items_discord, discord_msgs_found, discord_msgs_attachements WHERE 
        tasks.task_id = monitored_items_discord.task_id 
        AND 
        tasks.user_id="${_escpe(userId)}"
        AND
        monitored_items_discord.channel_id = discord_msgs_found.msg_channel_id AND monitored_items_discord.guild_id = discord_msgs_found.msg_guild_id
        AND
        discord_msgs_attachements.msg_id = discord_msgs_found.msg_id
        `)
        var handlesNoDup = [...new Set(userMonitoredItemsTwitter.map(e => e.handle))]
        var tasksWithDates = []
        for (let i = 0; i < handlesNoDup.length; i++) {
            var twitterUserName = handlesNoDup[i];
            var tasksWithUserName = userMonitoredItemsTwitter.filter(e => e.handle == twitterUserName)
            var oldestTask = tasksWithUserName.sort((a, b) => new Date(a.created_time_stamp).getTime() - new Date(b.created_time_stamp).getTime())[0]
            var oldestDate = new Date(oldestTask.created_time_stamp).toISOString()
            tasksWithDates.push({
                handle: twitterUserName,
                created_time_stamp: oldestDate
            })
        }
        var twitter_tweets = []
        for (let i = 0; i < tasksWithDates.length; i++) {
            const monitoredItemTwitter = tasksWithDates[i];
            var handle = monitoredItemTwitter.handle
            var dateCreated = monitoredItemTwitter.created_time_stamp
            if (userClient) {
                var twitterUser = await getTwitterUserData(handle, userClient).then(result => result.data)
                var results = await getAllTweets(userClient, { user: twitterUser, start_time: dateCreated })
                twitter_tweets.push({
                    handle,
                    date: dateCreated,
                    results
                })
                userMonitoredItemsTwitter.filter(e => e.handle == handle).forEach(item => {
                    item.tweetUser = twitterUser
                })
            } else {
                twitter_tweets.push({
                    handle,
                    date: dateCreated,
                    results: {}
                })

            }
        }

        user.twitterAcc = twitterAcc
        for (let i = 0; i < discord_msgs.length; i++) {
            var discord_msg = discord_msgs[i];
            discord_msg.attachements = discord_msgs_attachements.filter(e => e.msg_id == discord_msg.msg_id)
        }

        for (let i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            task.monitoredItems = {
                twitter: userMonitoredItemsTwitter.filter(e => e.task_id == task.task_id),
                discord: monitoredItemsDiscord.filter(e => e.task_id == task.task_id),
                opensea: monitoredItemsOpensea.filter(e => e.task_id == task.task_id)
            }
            task.results = [
                ...discord_msgs.map((item) => { return { ...item, type: "discord" } }),

            ]
            twitter_tweets.filter(handle_results => task.monitoredItems.twitter.filter(monitoredItem => monitoredItem.handle == handle_results.handle).length > 0).map(handle_results => {
                var twitterTask = task.monitoredItems.twitter.filter(monitoredItem => monitoredItem.handle == handle_results.handle)[0]
                var isQuoteTweets = twitterTask.quote_tweets
                var isRetweets = twitterTask.retweets
                var tweetUser = twitterTask.tweetUser
                var results = []
                if (userClient) {
                    if (isQuoteTweets && isRetweets) {
                        results = handle_results.results.tweets
                    } else if (isQuoteTweets && !isRetweets) {
                        results = handle_results.results.with_quoted_only
                    } else if (!isQuoteTweets && isRetweets) {
                        results = handle_results.results.with_retweets_only
                    } else if (!isQuoteTweets && !isRetweets) {
                        results = handle_results.results.tweets_only
                    }
                }
                return results.map(result => { return { ...result, tweetUser, created_time_stamp: result.created_at } })
            })
                .map(array => array.map((item) => { return { ...item, type: "twitter" } }) || [])
                .forEach((item) => {
                    task.results.push(...item)
                })
            task.results = task.results.sort((a, b) => new Date(b.created_time_stamp).getTime() - new Date(a.created_time_stamp).getTime())

        }
        resolve({ ...user, tasks })
    })

}
function _escpe(val) {
    if (val == undefined && val != null) {
        val = "";
    }
    if (typeof val != "string") {
        return val;
    }
    val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
        switch (s) {
            case "\0":
                return "\\0";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\b":
                return "\\b";
            case "\t":
                return "\\t";
            case "\x1a":
                return "\\Z";
            case "'":
                return "''";
            case '"':
                return '""';
            default:
                return "\\" + s;
        }
    });
    return val;
}

function PromisifiedQuery(sql, pst) {
    if (db != undefined) {
        return new Promise((resolve, reject) => {
            if (pst == undefined) {
                db.query(sql, pst, (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log("error PromisifiedQuery : " + err + "\n" + sql);
                    }
                    resolve(result);
                });
            } else {
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log("error PromisifiedQuery : " + err + "\n" + sql);
                    }
                    resolve(result);
                });
            }
        });
    } else {
        return;
    }
}
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")

}
function checkNotAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect("/")

}
module.exports = { PromisifiedQuery, _escpe, getData, checkAuth, checkNotAuth, getDataWithoutTasks, getTwitterUserData, getAllTweets }