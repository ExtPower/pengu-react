const passport = require('passport');
var { checkNotAuth, checkAuth, getData } = require("../../modules/functions")
const router = require('express').Router();
var isDev___ = false
router.get("/", passport.authenticate("discord"));

router.get('/redirect', checkNotAuth, passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/'
}));

router.get("/addToServer", checkAuth, (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=1008020130132918362&permissions=1024&redirect_uri=${isDev___ ? "http%3A%2F%2Flocalhost%3A3000%2Fauth" : "http%3A%2F%2Fdashboard.penguplatform.com%2Fauth"}%2Fdiscord%2Fredirect&response_type=code&scope=bot`)
})
module.exports = router