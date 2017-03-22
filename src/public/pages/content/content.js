/* globals $ */

((scope) => {
    const initial = () => {
        const url = window.baseUrl + "content";
        console.log(url);
        // Promise.all([http.get(url), templates.getPage("nav")])
        //     .then(([resp, templateFunc]) => {
        //         if (resp.result === "unauthorized!") {
        //             res = false;
        //         } else {
        //             res = resp.result;
        //         }
        //         let html = templateFunc({ res });

        //         $("#nav-wrap").html(html);

        //         $("#btn-login-modal").on("click", () => {
        //             modalLogin.show()
        //                 .then(() => {
        //                     helperFuncs.loginFormEvents();
        //                 });
        //         });
        //         $("#btn-register-modal").on("click", () => {
        //             modalRegister.show()
        //                 .then(() => {
        //                     helperFuncs.registerFormEvents();
        //                 });
        //         });
        //     });

    };

    scope.content = {
        initial
    };
})(window.controllers = window.controllers || {});