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

        // passport
        // const strategy = new LocalStrategy((username, password, done) => {
        //     data.findUserByCredentials(username, password)
        //         .then((user) => {
        //             console.log(user);
        //             if (user) {
        //                 return done(null, user);
        //             }
        //             return done(null, false);
        //         })
        //         .catch((error) => done(error, null));
        // });
    }));

    passport.use(LocalStrategy);
};