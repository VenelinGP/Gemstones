const LocalStrategy = require("passport-local");

module.exports = (passport, data) => {
    console.log("LocalStrategy");
    passport.use(new LocalStrategy(function(username, password, done) {
        // console.log(user);
        // data.user.findOne({ username })
        //     .exec((err, user) => {
        //         if (err) {
        //             console.log("Error loading user: " + err);
        //             return;
        //         }
        //         if (user && user.authenticate(password)) {
        //             done(null, user, { message: "Incorrect password." });
        //         } else {
        //             done(null, false);
        //         }
        //     });

        data.findUserByCredentials(username, password)
            .then((user) => {

                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch((error) => done(error, null));
    }));

    passport.use(LocalStrategy);
};

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