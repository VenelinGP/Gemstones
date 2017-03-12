module.exports = (data) => {
    return {
        home(req, res) {
            res.status(200).send(`
                    <h1>${req.user ? req.user.username : "Log In"}</h1>
                    <h2><a href="/logout">Logout</a></h2>
                `);
        },
        login(req, res) {
            res.status(200).send(`
                    <form action="/login" method="POST">
                        <input type="text" name="username" placeholder="Username">
                        <input type="text" name="password" placeholder="Password">
                        <input type="submit" value="Login">
                    </form>
                `);
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect("/login");
        },
        profile(req, res) {
            if (!req.isAuthenticated()) {
                return res.status(401).redirect("/unauthorized");
            }
            const user = req.user;
            return res.status(200).send(`
                    <h2>Welcome ${user.username}!<h2>
                    <a href="/home">Go to Home</a>
                `);
        },
        getRegister(req, res) {
            res.status(200).send(`
                    <form id="myRegister" action="/register" method="post" enctype="application/x-www-form-urlencoded">
                        <input type="text" name="username">
                        <input type="text" name="password">
                        <input type="submit" value="Register">
                    </form>
                `);
        },
        unauthorized(req, res) {
            res.send(`
                    <h2>You are is unauthorized</h2>
                `);
        }
    };
};