/* globals $ */
const modals = window.modals;
const footer = window.footer;
const notifier = window.notifier;
const admin = window.admin;

((scope) => {
    const modalLogin = modals.get("login");
    const modalRegister = modals.get("register");
    const helperFuncs = {
        loginUser(userToLogin) {
            const url = window.baseUrl + "login";
            // loader.show();
            // $("#loader .loader-title").html("Creating");

            Promise.all([http.postJSON(url, userToLogin), templates.getPage("nav")])
                .then(([resp, templateFunc]) => {

                    if (resp.result.success) {
                        res = resp.result;
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
                    $("#content-wrap").addClass(res.role);
                })
                .then(() => {
                    console.log($("#content-wrap").hasClass("admin"));
                    if ($("#content-wrap").hasClass("admin")) {
                        content.init("admin-content");
                        admin.init();
                    }
                    if ($("#content-wrap").hasClass("standart")) {
                        content.init("user-content");
                        users.init();
                    }
                })
                .catch((err) => {
                    // loader.hide();
                    notifier.error(`${userToLogin.username} not created! ${err}`);
                    console.log(JSON.stringify(err));
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
                    notifier.error(`${userToLogin.username} not created! ${err}`);
                    console.log(JSON.stringify(err));
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
        },

        menuCollaps() {
            let pull = $("#pull");
            menu = $("nav ul");
            link = $("#subMenu");
            signUp = $("#signUp");
            submenu = $("nav li ul");
            console.log(link);

            menuHeight = menu.height();

            $(pull).on("click", function(ev) {
                ev.preventDefault();
                menu.slideToggle();
                submenu.hide();
            });

            $(link).on("click", function(ev) {
                ev.preventDefault();
                signUp.next().hide();
                link.next().slideToggle();
            });
            $(signUp).on("click", function(ev) {
                ev.preventDefault();
                link.next().hide();
                signUp.next().slideToggle();
            });

            $(window).resize(function() {
                let win = $(window).width();
                if (win > 760 && menu.is(":hidden")) {
                    menu.removeAttr("style");
                }
            });
        }
    };

    const initial = () => {
        const url = window.baseUrl + "users";


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

                $(".btn-login-modal").on("click", () => {
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
            })
            .then(footer.init())
            .then(() => {
                content.init("no-user-content");
            })
            .then(() => {
                helperFuncs.menuCollaps();
            });

        Handlebars.registerHelper("ifEq", (v1, v2, options) => {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper("mod3", (index, options) => {
            if ((index + 1) % 3 === 0) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

    };
    scope.nav = {
        initial
    };
})(window.controllers = window.controllers || {});