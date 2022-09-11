const passport = require('passport');
var { checkNotAuth, checkAuth, getData } = require("../modules/functions")
const router = require('express').Router();
router.get("/", passport.authenticate("discord"));

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}));

router.get("/addToServer", checkAuth, (req, res) => {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=1008020130132918362&permissions=66560&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=bot%20guilds.members.read%20guilds")
})
