((scope) => {
    scope.home = {
        initial() {
            const url = window.baseUrl + "home";
            Promise.all([http.get(url), templates.getPage("home")])
                .then(([resp, templateFunc]) => {
                    console.log(resp);
                    if (resp.result === "unauthorized!") {
                        res = false;
                    } else {
                        res = resp.result;
                    }
                    let html = templateFunc({
                        res
                    });

                    // console.log(html);
                    $("#login-placeholder").html(html);
                });
        }
    };
})(window.controllers = window.controllers || {});