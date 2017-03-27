const router = require("express").Router();

module.exports = (app, pageController) => {
    console.log("Routing");
    router
        .get("/users", pageController.users.getUsers)
        .post("/login", pageController.auth.postLogin)
        .get("/login", pageController.auth.getLogin)
        .post("/register", pageController.users.createUser)
        .get("/register", pageController.users.getRegister)
        .get("/logout", pageController.auth.logout)
        .get("/unauthorized", pageController.auth.unauthorized)
        .post("/gemstone", pageController.gemstones.createGemstone)
        .get("/gemstone", pageController.gemstones.getGemstones)
        .get("/allGemstones", pageController.gemstones.getAllGemstones)

    .get("/profile", pageController.users.profile)
        .get("/all", pageController.users.getAllUsers);
    app.use("/api", router);
};