const LocalStrategy = require("passport-local");
const User = require("mongoose").model("User");

module.exports = (passport) => {
    console.log("LocalStrategy");
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username })
            .exec((err, user) => {
                if (err) {
                    console.log("Error loading user: " + err);
                    return;
                }
                console.log();
                if (user && user.authenticate(user.salt, user.hashPass, password)) {
                    done(null, user, { message: "Incorrect password." });
                } else {
                    done(null, false);
                }
            });
    }));

    passport.use(LocalStrategy);
};