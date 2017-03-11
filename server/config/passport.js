const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;

module.exports = function() {
    passport.use(new Strategy(function(username, password, done) {
        user.findOne({
            username
        }).exec((err, user) => {
            if (err) {
                console.log("Error loading user: " + err);
                return;
            }
            if (user && user.authenticate(password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }).exec(function(err, user) {
            if (err) {
                console.log("Error loading user: " + err);
                return;
            }

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
};