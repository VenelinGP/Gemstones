const url = "http://localhost:3000/api/all";

(() => {
    const root = null,
        useHash = false;

    let router = new Navigo(root);
    console.log("Here 1");
    router
        .on(() => {
            Promise.all([http.get(url), templates.getPage("home")])
                .then(([resp, templateFunc]) => {
                    let users = resp;
                    let html = templateFunc({
                        model: users
                    });
                    $("#page-placeholder").html(html);
                    console.log(html);
                });
        })
        .resolve();
})();