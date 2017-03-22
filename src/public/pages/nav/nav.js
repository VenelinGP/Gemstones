/* globals $ */
const modals = window.modals;
const notifier = window.notifier;

((scope) => {
    const modalLogin = modals.get("login");
    const modalRegister = modals.get("register");
    const helperFuncs = {
        loginUser(userToLogin) {
            const url = window.baseUrl + "login";
            // loader.show();
            // $("#loader .loader-title").html("Creating Book");

            Promise.all([http.postJSON(url, userToLogin), templates.getPage("nav")])
                .then(([resp, templateFunc]) => {

                    if (resp.result.success) {
                        res = resp.result;
                        console.log(resp.result);
                        let html = templateFunc({
                            res
                        });
                        $("#nav-wrap").html(html);
                        notifier.success(`Welcome ${userToLogin.username}!`);
                    } else {
                        res = resp.result.success;
                        notifier.error("Wrong username or password!");
                    }
                    // loader.hide();
                    modalLogin.hide();
                })
                .catch((err) => {
                    // loader.hide();
                    // console.log(`${userToLogin.username} not created! ${err}`);
                    notifier.error(`${userToLogin.username} not created! ${err}`);
                    console.log(JSON.stringify(err)); // eslint-disable-line no-console
                });
        },
        registerUser(userToRegister) {
            const url = window.baseUrl + "register";
            // loader.show();
            // $("#loader .loader-title").html("Creating Book");

            Promise.all([http.postJSON(url, userToRegister), templates.getPage("nav")])
                .then(([resp, templateFunc]) => {
                    if (resp.result.success) {
                        res = false;
                    } else {
                        res = resp.result;
                        console.log(resp);

                        // let html = templateFunc({
                        //     res
                        // });
                        // $("#nav-wrap").html(html);
                    }
                    // loader.hide();
                    modalRegister.hide();
                })
                .catch((err) => {
                    // loader.hide();
                    // console.log(`${userToLogin.username} not created! ${err}`);
                    notifier.error(`${userToLogin.username} not created! ${err}`);
                    console.log(JSON.stringify(err)); // eslint-disable-line no-console
                });
        },
        loginFormEvents() {
            const $form = $("#form-login");
            $form.on("submit", function() {

                const user = {
                    username: $("#tb-username").val(),
                    password: $("#tb-password").val()
                };
                console.log(user);
                helperFuncs.loginUser(user);
                return false;
            });
        },
        registerFormEvents() {
            const $form = $("#form-register");
            $form.on("submit", function() {

                const user = {
                    firstName: $("#tb-firstname").val(),
                    lastName: $("#tb-lastname").val(),
                    username: $("#tb-username").val(),
                    password: $("#tb-password").val()
                };

                helperFuncs.registerUser(user);

                return false;
            });
        }
    };

    const initial = () => {
        const url = window.baseUrl + "users";
        console.log(url);
        Promise
            .all([http.get(url), templates.getPage("nav")])
            .then(([resp, templateFunc]) => {
                if (resp.result === "unauthorized!") {
                    res = false;
                } else {
                    res = resp.result;
                }
                let html = templateFunc({ res });
                $("#nav-wrap").html(html);

                $("#btn-login-modal").on("click", () => {
                    modalLogin.show()
                        .then(() => {
                            helperFuncs.loginFormEvents();
                        });
                });
                $("#btn-register-modal").on("click", () => {
                    modalRegister.show()
                        .then(() => {
                            helperFuncs.registerFormEvents();
                        });
                });
            });

        Handlebars.registerHelper("ifEq", (v1, v2, options) => {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    };
    scope.nav = {
        initial

    };
})(window.controllers = window.controllers || {});