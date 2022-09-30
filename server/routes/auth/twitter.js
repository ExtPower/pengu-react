const passport = require('passport');
var { checkNotAuth, checkAuth, getData, PromisifiedQuery, _escpe } = require("../../modules/functions")
const router = require('express').Router();

router.get("/", checkAuth, passport.authenticate("twitter"));

router.get('/redirect', checkAuth,
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/dashboard');
    });
router.get('/logout', checkAuth, async function (req, res) {
    await PromisifiedQuery(`DELETE FROM twitter_account WHERE user_id="${_escpe(req.user.user_id)}"`)
        .then((results) => {
            return results[0] || { twitter_id: null }
        });

    res.redirect('/dashboard');
});

module.exports = router
