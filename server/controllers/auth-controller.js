let passport = require("passport");

module.exports = (data) => {
    return {
        login(req, res, next) {
            const auth = passport.authenticate("local", (err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    res.json({
                        success: false,
                        message: "Invalid name or password"
                    });
                }

                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    // res.send({
                    //     success: true,
                    //     user
                    // });
                    res.redirect("./profile");
                });
            });
            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.redirect("/home");
            // res.end();
        },
        register(req, res) {
            console.dir(req.body);
            const user = {
                username: req.body.username,
                password: req.body.password
            };

            data.createUser(user)
                .then(() => {
                    res.status(201).send("<h1>Worked!</h1>")
                })
                .catch((error) => res.status(500).json(error));
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
        }
    };
};