let passport = require("passport");

module.exports = (data) => {
    return {
        getLogin(req, res) {
            res.status(200).send(`
                    <form action="/api/login" method="POST">
                    <p>
                        <input type="text" name="username" placeholder="Username">
                    </p>
                    <p>
                        <input type="text" name="password" placeholder="Password">
                    </p>
                    <p>
                        <input type="submit" value="Login">
                    </p>
                    </form>
                `);
        },
        postLogin(req, res, next) {
            // passport.authenticate("local", { failureRedirect: "/login" }
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
                    res.redirect("/api/profile");
                });
            });
            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect("/api/login");
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
            res.send({ reason: "You are is unauthorized!" });
        },
    };
};