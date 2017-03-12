const data = require("../../../arhiv/dataDb"),
    passport = require("passport");


require("./local-strategy")(passport, data);

passport.serializeUser((user, done) => {
    if (user) {
        console.log(user);
        return done(null, user.id);
    }
});


passport.deserializeUser((userId, done) => {
    // use the id serialized in the session to retrieve the use from the database
    data.findUserById(userId)
        .then((user) => {
            return done(null, user || false);
        })
        .catch((error) => done(error, false));
});


// passport.deserializeUser(function(id, done) {
// //     User.findOne({ _id: id }).exec(function(err, user) {
//         if (err) {
//             console.log("Error loading user: " + err);
//             return;
//         }

//         if (user) {
//             done(null, user);
//         } else {
//             done(null, false);
//         }
//     });
// });

module.exports = (app) => {
    console.log("Passport index");
    app.use(passport.initialize());
    app.use(passport.session());
};