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

// module.exports.seedInitialUsers = () => {
//     User.find({}).exec((err, collection) => {
//         if (err) {
//             console.log("Cannot find users: " + err);
//             return;
//         }

//         if (collection.length === 0) {
//             let salt = "";
//             let hashedPwd = "";

//             salt = encryption.generateSalt();
//             console.log(salt);
//             hashedPwd = encryption.generateHashedPassword(salt, "viplnx");
//             User.create({
//                 username: "venelingp",
//                 firstName: "Venelin",
//                 lastName: "Petkov",
//                 salt,
//                 hashPass: hashedPwd,
//                 roles: ["admin"]
//             });
//             salt = encryption.generateSalt();

//             hashedPwd = encryption.generateHashedPassword(salt, "Pesho");
//             User.create({
//                 username: "pesho.petrov",
//                 firstName: "Pesho",
//                 lastName: "Petrov",
//                 salt,
//                 hashPass: hashedPwd,
//                 roles: ["standard"]
//             });
//             salt = encryption.generateSalt();

//             hashedPwd = encryption.generateHashedPassword(salt, "Jonny");
//             User.create({
//                 username: "jonny.walker",
//                 firstName: "Jonny",
//                 lastName: "Walker",
//                 salt,
//                 hashPass: hashedPwd
//             });

//             console.log("Users added to database...");
//         }
//     });
//};