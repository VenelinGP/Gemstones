const User = require("mongoose").model("User");
const passport = require("passport");

require("./local-strategy")(passport);

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

module.exports = (app) => {
    console.log("Passport index");
    app.use(passport.initialize());
    app.use(passport.session());
};