const encryption = require("../utilities/encryption"),
    mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.seedInitialUsers = () => {
    User.find({}).exec((err, collection) => {
        if (err) {
            console.log("Cannot find users: " + err);
            return;
        }

        if (collection.length === 0) {
            let salt = "";
            let hashedPwd = "";

            salt = encryption.generateSalt();
            console.log(salt);
            hashedPwd = encryption.generateHashedPassword(salt, "viplnx");
            User.create({
                username: "venelingp",
                firstName: "Venelin",
                lastName: "Petkov",
                salt,
                hashPass: hashedPwd,
                roles: ["admin"]
            });
            salt = encryption.generateSalt();

            hashedPwd = encryption.generateHashedPassword(salt, "Pesho");
            User.create({
                username: "pesho.petrov",
                firstName: "Pesho",
                lastName: "Petrov",
                salt,
                hashPass: hashedPwd,
                roles: ["standard"]
            });
            salt = encryption.generateSalt();

            hashedPwd = encryption.generateHashedPassword(salt, "Jonny");
            User.create({
                username: "jonny.walker",
                firstName: "Jonny",
                lastName: "Walker",
                salt,
                hashPass: hashedPwd
            });

            console.log("Users added to database...");
        }
    });
};