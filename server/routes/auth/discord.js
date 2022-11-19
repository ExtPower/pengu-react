const passport = require('passport');
var { checkNotAuth, checkAuth, getData } = require("../../modules/functions")
const router = require('express').Router();
router.get("/", passport.authenticate("discord"));

router.get('/redirect', checkNotAuth, passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/'
}));

router.get("/addToServer", checkAuth, (req, res) => {
    res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=66560`)
})
module.exports = router