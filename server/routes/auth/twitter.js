const passport = require('passport');
var { checkNotAuth, checkAuth, getData } = require("../modules/functions")
const router = require('express').Router();

router.get("/", passport.authenticate("twitter"));

router.get('/redirect',
    passport.authenticate('twitter', { failureRedirect: '/forbidden' }),
    function (req, res) {
        res.redirect('/dashboard');
    });
