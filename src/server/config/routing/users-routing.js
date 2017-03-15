const router = require("express").Router();

module.exports = (app, pageController) => {
    console.log("Routing");
    router
        .get("/login", pageController.auth.getLogin)
        .post("/login", pageController.auth.postLogin)
        .get("/logout", pageController.auth.logout)
        .get("/unauthorized", pageController.auth.unauthorized)
        .get("/register", pageController.users.getRegister)
        .post("/register", pageController.users.createUser)
        .get("/profile", pageController.users.profile)
        .get("/home", pageController.users.home)
        .get("/all", pageController.users.getAllUsers);

    app.use("/api", router);
};