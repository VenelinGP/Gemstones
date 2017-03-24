const router = require("express").Router();

module.exports = (app, pageController) => {
    console.log("Routing");
    router
        .get("/users", pageController.users.getUsers)
        .post("/login", pageController.auth.postLogin)
        .post("/register", pageController.users.createUser)
        .get("/gemstone", pageController.gemstones.postGemstone)
        .post("/gemstone", pageController.gemstones.createGemstone)
        .get("/profile", pageController.users.profile)
        .get("/all", pageController.users.getAllUsers)
        .get("/logout", pageController.auth.logout)
        .get("/login", pageController.auth.getLogin)
        .get("/register", pageController.users.getRegister)
        .get("/unauthorized", pageController.auth.unauthorized);
    app.use("/api", router);
};