const DiscordStrategy = require("passport-discord").Strategy,
    refresh = require("passport-oauth2-refresh");
const passport = require("passport");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = require('axios');

// refresh.requestNewAccessToken('discord', profile.refreshToken, function (err, accessToken, refreshToken) {
//     if (err)
//         throw; // boys, we have an error here.

//     profile.accessToken = accessToken; // store this new one for our new requests!
// });
function make_config(authorization_token) { // Define the function
    var data = { // Define "data"
        headers: { // Define "headers" of "data"
            "authorization": `Bearer ${authorization_token}` // Define the authorization
        }
    };
    return data; // Return the created object
};

function fetchDiscord(api, access_token) {

    return axios.get(`https://discord.com/api/${api}`, make_config(access_token))
}
function refreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
        refresh.requestNewAccessToken('discord', refreshToken, function (err, accessToken, refreshToken) {
            if (err)
                reject({ isSuccess: false, data: err }); // boys, we have an error here.
            resolve({
                isSuccess: true,
                data: {
                    accessToken,
                    refreshToken
                }
            }); // store this new one for our new requests!
        });
    })

}


passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CLIENT_REDIRECT,
            scope: ["identify", "email", "guilds", "messages.read"],
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            console.log("====================================");
            console.log(profile);
            console.log("====================================");
            var username = `${profile.username}#${profile.discriminator}`;
            var accessTokens = [
                { token: accessToken, id: profile.id },
                ...(req.session?.passport?.user?.accessTokens || []),
            ];
            var refreshTokens = [
                { token: refreshToken, id: profile.id },
                ...(req.session?.passport?.user?.refreshTokens || []),
            ];
            const user = { ...profile };

            try {
                // const user = await DiscordUser.findOne({ discordId: profile.id });
                if (user) {
                    console.log("User exists.");
                    // await user.updateOne({
                    //     username: `${profile.username}#${profile.discriminator}`,
                    //     guilds: profile.guilds
                    // });
                    done(null, {
                        user_id: user.id,
                        guilds: user.guilds,
                        email: user.email,
                        username,
                        accessTokens,
                        refreshTokens,
                    });
                } else {
                    console.log("User does not exist");
                    // const newUser = await DiscordUser.create({
                    //     discordId: profile.id,
                    //     username: profile.username,
                    //     guilds: profile.guilds
                    // });
                    // const savedUser = await newUser.save();
                    // done(null, savedUser);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    var { user_id, accessTokens, refreshTokens } = user;
    console.log("Serialize");
    done(null, { user_id, accessTokens, refreshTokens });
});

passport.deserializeUser(async (user, done) => {
    var { user_id, accessTokens, refreshTokens } = user;
    console.log("Deserializing");
    user = { user_id, accessTokens, refreshTokens };
    // const user = await DiscordUser.findById(id);
    if (user) done(null, user);
});
