let passport = require("passport");

module.exports = {
    login: (req, res, next) => {
        let auth = passport.authenticate("local", (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({
                    success: false
                });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.send({
                    success: true,
                    user
                });
            });
        });

        auth(req, res, next);
    },
    logout: (req, res) => {
        req.logout();
        res.end();
    },
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(403);
        res.end();
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                return next();
            }
            res.status(403);
            res.end();
        };
    }
};