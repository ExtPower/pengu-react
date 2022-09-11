var db = require("../modules/db")

function getData(user1) {
    return new Promise(async (resolve, reject) => {
        var user = { ...user1 }
        var userId = user.user_id
        delete user.id
        var tasks = await PromisifiedQuery(`SELECT * FROM tasks WHERE user_id="${_escpe(userId)}"`)
        var promises = []
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]
            const taskId = task.id;
            const taskType = task.type;
            promises.push(PromisifiedQuery(`SELECT * FROM tasks_${_escpe(taskType)} WHERE task_id="${_escpe(taskId)}"`))
        }
        var tasksDetails = await Promise.all(promises).then((results) => {
            var finalRes = []
            results.forEach((promiseRes) => {
                promiseRes.forEach((detail) => {
                    finalRes.push(detail)
                })
            })
            return finalRes
        })
        var finalData = []
        for (let i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var taskDetails = tasksDetails.filter(e => e.task_id == task.task_id)?.[0] || { task_id: null }
            if (taskDetails.task_id == null) {
                task = { ...taskDetails, ...task }
            }
            finalData.push(task)
        }

        var discordTasks = finalData.filter(e => e.type == "discord")
        var discord_msgs = await PromisifiedQuery(`SELECT * FROM discord_msgs_found WHERE 1`)
        var discord_msgs_attachements = await PromisifiedQuery(`SELECT * FROM discord_msgs_attachements WHERE 1`)
        for (let i = 0; i < discord_msgs.length; i++) {
            var discord_msg = discord_msgs[i];
            discord_msg.attachements = discord_msgs_attachements.filter(e => e.msg_id == discord_msg.msg_id)
        }
        for (let i = 0; i < discordTasks.length; i++) {
            const discordTask = discordTasks[i];
            discordTask.results = discord_msgs.filter(e => e.channel_id == discordTask.channel_id && e.guild_id == discordTask.guild_id)
        }
        var twitterTasks = finalData.filter(e => e.type == "twitter")
        var openseaTasks = finalData.filter(e => e.type == "opensea")
        resolve({ ...user, tasksData: { discordTasks, twitterTasks, openseaTasks } })
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
    res.redirect("/")

}
function checkNotAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect("/")

}
module.exports = { PromisifiedQuery, _escpe, getData, checkAuth, checkNotAuth }