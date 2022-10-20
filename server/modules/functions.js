var db = require("../modules/db")

function getData(user1) {
    return new Promise(async (resolve, reject) => {
        var user = { ...user1 }
        var userId = user.user_id
        delete user.id
        var twitterAcc = await PromisifiedQuery(`SELECT * FROM twitter_account WHERE user_id="${_escpe(userId)}"`).then((res) => res[0] || { twitter_id: null })
        var tasks = await PromisifiedQuery(`SELECT * FROM tasks WHERE user_id="${_escpe(userId)}"`)
        var monitoredItemsTwitter = await PromisifiedQuery(`SELECT * FROM monitored_items_twitter WHERE 1`)
        var monitoredItemsDiscord = await PromisifiedQuery(`SELECT * FROM monitored_items_discord WHERE 1`)
        var monitoredItemsOpensea = await PromisifiedQuery(`SELECT * FROM monitored_items_opensea WHERE 1`)
        var discord_msgs = await PromisifiedQuery(`SELECT * FROM discord_msgs_found WHERE 1`)
        var discord_msgs_attachements = await PromisifiedQuery(`SELECT * FROM discord_msgs_attachements WHERE 1`)
        user.twitterAcc = twitterAcc
        for (let i = 0; i < discord_msgs.length; i++) {
            var discord_msg = discord_msgs[i];
            discord_msg.attachements = discord_msgs_attachements.filter(e => e.msg_id == discord_msg.msg_id)
        }

        for (let i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            task.monitoredItems = {
                twitter: monitoredItemsTwitter.filter(e => e.task_id == task.task_id),
                discord: monitoredItemsDiscord.filter(e => e.task_id == task.task_id),
                opensea: monitoredItemsOpensea.filter(e => e.task_id == task.task_id)
            }
            task.results = [
                ...discord_msgs.filter(discordmsg => task.monitoredItems.discord.filter(monitoredItem => discordmsg.msg_channel_id == monitoredItem.channel_id && discordmsg.msg_guild_id == monitoredItem.guild_id && monitoredItem.created_time_stamp < discordmsg.created_time_stamp).length > 0).map((item) => {
                    return {
                        ...item,
                        type: "discord"
                    }
                })
            ].sort((a, b) => b.created_time_stamp - a.created_time_stamp)
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
module.exports = { PromisifiedQuery, _escpe, getData, checkAuth, checkNotAuth }