// const router = require("express").Router(),
// const statusCodeNotFound = 404;
// let multipart = require("connect-multiparty");
// let multipartMiddleware = multipart();

// module.exports = (app, auth, userController) => {
//     router.get("/", (req, res) => {
//             if (req.user) {
//                 res.redirect("/home");
//             } else {
//                 res.render("index");
//             }
//         })
//         .post("/login", auth.login)
//         .post("/register", auth.register)
//         .get("/home", userController.auth.home)
//         .get("/logout", userController.auth.logout)
//         .get("/about", userController.auth.about)
//         .get("/unauthorized", (req, res) => {
//             res.render("no-auth");
//         })
//         // .all("*", (req, res) => {
//         //     res.status(statusCodeNotFound);
//         //     res.render("error");
//         // });

//     app.use(router);
// };

let auth = require("../auth"),
    controllers = require("../../controllers");

module.exports = (app) => {
    console.log("Loaded Routing");
    app.get("/api/users", controllers.users.getAllUsers);
    app.post("/api/users", controllers.users.createUser);
    app.put("/api/users", auth.isAuthenticated, controllers.users.updateUser);

    // app.get("/api/courses", controllers.courses.getAllCourses);
    // app.get("/api/courses/:id", controllers.courses.getCourseById);

    // app.get("/partials/:partialArea/:partialName", function(req, res) {
    //     res.render("../../public/app/" + req.params.partialArea + "/" + req.params.partialName)
    // });

    app.post("/login", auth.login);
    app.post("/logout", auth.logout);

    app.get("/api/*", function(req, res) {
        res.status(404);
        res.end();
    });

    app.get("*", function(req, res) {
        res.render("index", { currentUser: req.user });
    });
};