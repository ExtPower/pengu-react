const router = require('express').Router();
const discord = require("./auth/discord.js")
const twitter = require("./auth/twitter.js")
var { checkNotAuth, checkAuth, getData } = require("../modules/functions")
// const { Client, GatewayIntentBits } = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
router.use("/discord", discord)
router.use("/twitter", twitter)


router.get('/logout', checkAuth, (req, res) => {
    req.logout(function () {
        res.redirect('https://www.penguplatform.com/');
    });
});



module.exports = router;
