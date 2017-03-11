"use strict";

module.exports = (data) => {
    const auth = require("./auth-controller")(data);

    return {
        auth
    };
};