let passport = require("passport");

module.exports = (data) => {
    return {
        getLogin(req, res) {
            res.status(200).redirect("/");
        },
        postLogin(req, res, next) {
            const auth = passport.authenticate("local", (err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    res.send({
                        result: {
                            success: false,
                            message: "Invalid name or password"
                        }
                    });
                    // res.json({
                    //     success: false,
                    //     message: "Invalid name or password"
                    // });
                }

                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    return res.status(200).json({
                        result: {
                            success: true,
                            username: user.username,
                            role: user.roles[0]
                        }
                    });
                });
            });
            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect("/");
        },
        isAuthenticated(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            res.status(403);
            return res.end();
        },
        isInRole(role) {
            return (req, res, next) => {
                if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                    return next();
                }
                res.status(403);
                res.end();
            };
        },
        unauthorized(req, res) {
            res.send({ result: "unauthorized!" });
        },
    };
};