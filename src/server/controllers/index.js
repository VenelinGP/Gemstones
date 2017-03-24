// var coursesController = require("../controllers/coursesController");
module.exports = (data) => {
    const auth = require("./auth-controller")(data),
        gemstones = require("./gemstones-controller")(data),
        users = require("./users-controller")(data);
    return {
        auth,
        gemstones,
        users

    };
};