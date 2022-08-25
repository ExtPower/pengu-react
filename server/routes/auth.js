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
router.get("/addBot", (req, res) => {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=1008020130132918362&permissions=1024&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fredirect&response_type=code&scope=bot")
});

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
