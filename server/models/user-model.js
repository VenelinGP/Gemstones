const mongoose = require("mongoose");
const encryption = require("../utilities/encryption");
let Schema = mongoose.Schema;
let requiredValidationMessage = "{PATH} is required";


let userSchema = new Schema({
    username: {
        type: String,
        require: requiredValidationMessage,
        unique: true
    },
    firstName: {
        type: String,
        require: requiredValidationMessage
    },
    lastName: {
        type: String,
        require: requiredValidationMessage
    },
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: (salt, hashPass, password) => {
        if (encryption.generateHashedPassword(salt, password) === hashPass) {
            return true;
        }
        return false;

    }
});

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
// let User = mongoose.model("User", userSchema);

mongoose.model("User", userSchema);
let User = mongoose.model("User");

module.exports = User;