const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');
// const Discord = require("discord.js");
// const client = new Discord.Client();

dotenv.config({ path: path.join(__dirname, ".env") })
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')))
require('./routes/db.js');
require('./routes/discord.js');
require('./strategies/discordstrategy');
const authRoute = require('./routes/auth');

app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    saveUninitialized: false,
    resave: false,
}));

app.use(express.static(path.join(__dirname, 'static')));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoute);

app.get(["/", "/dashboard*"], function (req, res) {
    console.log(req.user);
    res.sendFile(path.join(__dirname, 'static/index.html'));
})







app.listen('3001', () => {
    console.log('Server started on port 3001');
});


