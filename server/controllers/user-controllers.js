const encryption = require("../utilities/encryption");
// const mongoose = require("mongoose");
let User = require("../models/User");
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);
// let User = require("mongoose").model("userShema");
const statusCode = require("./status-codes");

module.exports = {
    createUser: (req, res) => {
        let newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function(err, user) {
            if (err) {
                console.log("Failed to register new user: " + err);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    res.status(statusCode.BadRequest);
                    return res.send({ reason: err.toString() });
                }

                res.send(user);
            });
        });
    },
    updateUser: (req, res, next) => {
        if (req.user._id == req.body._id || req.user.roles.indexOf("admin") > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            User.update({ _id: req.body._id }, updatedUserData, function() {
                res.end();
            })
        } else {
            res.send({ reason: "You do not have permissions!" })
        }
    },
    getAllUsers: (req, res) => {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log("Users could not be loaded: " + err);
            }

            res.send(collection);
        });
    }
};