let encryption = require("../utilities/encryption");
let User = require("../models/").User;

module.exports = (data) => {
    return {
        home(req, res) {
            if (!req.isAuthenticated()) {
                return res.status(401).redirect("/api/unauthorized");
            }
            if (!req.user) {
                return res.status(200).send({ result: "You are not logged!" });
            }
            return res.status(200).send({
                result: {
                    username: `${req.user.username}`,
                    role: `${req.user.roles}`
                }
            });
        },
        profile(req, res) {
            if (!req.isAuthenticated()) {
                return res.status(401).redirect("/api/unauthorized");
            }
            const user = req.user;
            return res.status(200).send({ result: `${user.username}` });

        },
        getRegister(req, res) {
            res.status(200).send(`
                    <form id="myRegister" action="/api/register" method="post" enctype="application/x-www-form-urlencoded">
                        <p>
                            <label for="firstName" class="uname" data-icon="u">First name</label>
                        </p>
                        <p>
                            <input type="text" name="firstName">
                        </p>
                        <p>
                            <label for="lastName" class="uname" data-icon="u">Last name</label>
                        </p>
                        <p>
                            <input type="text" name="lastName">
                        </p>
                        <p>
                            <label for="username" class="uname" data-icon="u">Username</label>
                        </p>
                        <p>
                            <input type="text" name="username">
                        </p>
                        <p>
                            <label for="password" class="uname" data-icon="u">Password</label>
                        </p>
                        <p>
                            <input type="text" name="password">
                        </p>
                        <p>
                            <input type="submit" value="Register">
                        </p>
                    </form>
                `);
        },
        createUser(req, res) {
            let newUserData = req.body;
            console.log(newUserData);
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            newUserData.roles = ["standard"];
            console.log(newUserData);
            User.create(newUserData, (err, user) => {
                if (err) {
                    console.log("Failed to register new user: " + err);
                    return res.send({
                        result: {
                            success: false,
                            error: `Duplicate username: ${newUserData.username}`
                        }
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        res.status(400);
                        return res.send({ reason: err.toString() });
                    }
                    return res.status(200).json({
                        result: {
                            success: true,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            role: user.roles[0]
                        }
                    });
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
                res.send({ reason: "You do not have permissions!" });
            }
        },
        getAllUsers(req, res) {
            if (!req.isAuthenticated() || !(req.user.roles.indexOf("admin") > -1)) {
                if (req.isAuthenticated()) {
                    res.send({ reason: "You are not an admin!" });
                } else {
                    return res.status(401).redirect("/api/unauthorized");
                }
            }
            User.find({}).exec((err, collection) => {
                if (err) {
                    return res.send({
                        error: "Username is already taken"
                    });
                    // console.log("Users could not be loaded: " + err);
                }
                return res.send(collection);
            });
        }
    };
};