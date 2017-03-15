// var coursesController = require("../controllers/coursesController");
module.exports = (data) => {
    const auth = require("./auth-controller")(data),
        users = require("./users-controller")(data);
    return {
        auth,
        users
    };
};