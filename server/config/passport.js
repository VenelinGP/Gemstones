const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;

module.exports = function() {
    // passport.use(new Strategy(function(username, password, done) {
    //     user.findOne({ username: username }).exec(function(err, user) {
    //         if (err) {
    //             console.log("Error loading user: " + err);
    //             return;
    //         }
    //         if (user && user.authenticate(password)) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false);
    //         }
    //     })
    // }));

    passport.use(new Strategy((token, done) => {
        data.users.findByToken(token)
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }

                return done(null, user, {
                    scope: "all"
                });
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((token, done) => {
        return data.users.findByToken(token)
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
};