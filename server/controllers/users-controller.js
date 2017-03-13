let encryption = require("../utilities/encryption");
let User = require("../models/").User;

module.exports = (data) => {
    return {
        home(req, res) {
            res.status(200).send(`
                    <h1>${req.user ? req.user.username : "Log In"}</h1>
                    <h2><a href="/logout">Logout</a></h2>
                `);
        },
        login(req, res) {
            res.status(200).send(`
                    <form action="/login" method="POST">
                        <input type="text" name="username" placeholder="Username">
                        <input type="text" name="password" placeholder="Password">
                        <input type="submit" value="Login">
                    </form>
                `);
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect("/login");
        },
        profile(req, res) {
            if (!req.isAuthenticated()) {
                return res.status(401).redirect("/unauthorized");
            }
            const user = req.user;
            return res.status(200).send(`
                    <h2>Welcome ${user.username}!<h2>
                    <a href="/home">Go to Home</a>
                `);
        },
        getRegister(req, res) {
            res.status(200).send(`
                    <form id="myRegister" action="/register" method="post" enctype="application/x-www-form-urlencoded">
                        <input type="text" name="username">
                        <input type="text" name="password">
                        <input type="submit" value="Register">
                    </form>
                `);
        },
        unauthorized(req, res) {
            res.send(`
                    <h2>You are is unauthorized</h2>
                `);
        },
        createUser(req, res) {
            let newUserData = req.body;
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            User.create(newUserData, (err, user) => {
                if (err) {
                    console.log("Failed to register new user: " + err);
                    return;
                }

                req.logIn(user, (err) => {
                    if (err) {
                        res.status(400);
                        return res.send({ reason: err.toString() });
                    }

                    res.send(user);
                });
            });
        },
        updateUser(req, res) {
            if (req.user._id === req.body._id || req.user.roles.indexOf("admin") > -1) {
                let updatedUserData = req.body;
                if (updatedUserData.password && updatedUserData.password.length > 0) {
                    updatedUserData.salt = encryption.generateSalt();
                    updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                }

                User.update({ _id: req.body._id }, updatedUserData, () => {
                    res.end();
                });
            } else {
                res.send({ reason: "You do not have permissions!" })
            }
        },
        getAllUsers(req, res) {
            User.find({}).exec((err, collection) => {
                if (err) {
                    console.log("Users could not be loaded: " + err);
                }

                res.send(collection);
            });
        }
    };
};