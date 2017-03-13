const router = require("express").Router();

module.exports = (app, pageController) => {
    console.log("Routing");
    router
        .get("/login", pageController.users.login)
        .post("/login", pageController.auth.login)
        .get("/register", pageController.users.getRegister)
        .post("/register", pageController.users.createUser)
        .get("/profile", pageController.users.profile)
        .get("/home", pageController.users.home)
        .get("/logout", pageController.users.logout)
        .get("/unauthorized", pageController.users.unauthorized);

    app.use(router);
};