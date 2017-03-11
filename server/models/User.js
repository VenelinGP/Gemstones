"use strict";

const mongoose = require("mongoose"),
    encryption = require("../utilities/encryption"),
    Schema = mongoose.Schema;




let requiredValidationMessage = "{PATH} is required";
let User;

let userSchema = mongoose.Schema({
    username: { type: String, require: requiredValidationMessage, unique: true },
    firstName: { type: String, require: requiredValidationMessage },
    lastName: { type: String, require: requiredValidationMessage },
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
})

// userSchema.pre("save", true, function(next, done) {
//     let self = this;
//     mongoose.models["User"].findOne({ username: self.username }, function(err, user) {
//         if (err) {
//             done(err);
//         } else if (user) {
//             self.invalidate("username", "User already exist!");
//             done(new Error("User already exist!"));
//         } else {
//             done();
//         }
//     });
//     next();
// });


//let User = mongoose.model('User', userSchema);
mongoose.model("User", userSchema);
User = mongoose.model("User");
module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            let salt;
            let hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Venelin');
            User.create({ username: 'venelingp', firstName: 'Venelin', lastName: 'Petkov', salt: salt, hashPass: hashedPwd, roles: ['admin'] });
            salt = encryption.generateSalt();

            hashedPwd = encryption.generateHashedPassword(salt, 'Pesho');
            User.create({ username: 'pesho.petrov', firstName: 'Pesho', lastName: 'Petrov', salt: salt, hashPass: hashedPwd, roles: ['standard'] });
            salt = encryption.generateSalt();

            hashedPwd = encryption.generateHashedPassword(salt, 'Jonny');
            User.create({ username: 'jonny.walker', firstName: 'Jonny', lastName: 'Walker', salt: salt, hashPass: hashedPwd });

            console.log('Users added to database...');
        }
    });
};