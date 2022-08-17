const router = require('express').Router();
const passport = require('passport');
// const { Client, GatewayIntentBits } = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}));
router.get('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});
router.get('/user', (req, res) => {
    if (req.user) {
        req.logout();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
    // client.login(req.session.token);

});
router.get("/discord", passport.authenticate("discord"));

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log("User is logged in.");
        next();
    }
    else {
        console.log("User is not logged in.");
        res.redirect('/');
    }
}


module.exports = router;
