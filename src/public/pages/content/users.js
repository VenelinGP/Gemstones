/* globals $ */

((scope) => {
    const stones = [];
    const helperFuncs = {
        addGemstone(gemstoneToAdd) {
            const url = window.baseUrl + "gemstone";

            Promise.all([http.postJSON(url, gemstoneToAdd), templates.getPage("top-products")])
                .then(([resp, templateFunc]) => {
                    if (resp.result.success) {
                        res = false;
                    } else {
                        res = resp.result;
                        console.log(res);
                        let html = templateFunc({
                            res
                        });
                        console.log(html);
                        $("#top-products").html(html);
                    }
                    // loader.hide();
                    notifier.success(`${gemstoneToAdd.name} is created!`);
                })
                .catch((err) => {
                    // loader.hide();
                    notifier.error(`${userToLogin.username} not created! ${err}`);
                    console.log(JSON.stringify(err));
                });
        },
        addFormEvents() {
            const $form = $("#form-add-gemstone");
            $form.on("submit", function() {

                const gemstone = {
                    name: $("#tb-name").val(),
                    description: $("#tb-description").val(),
                    image: $("#tb-image").val(),
                    price: $("#tb-price").val(),
                    quantity: $("#tb-quantity").val()
                };

                helperFuncs.addGemstone(gemstone);

                return false;
            });
        }
    };

    scope.users = {
        init() {
            const url = window.baseUrl + "allGemstones";
            Promise
                .all([http.get(url), templates.getPage("products")])
                .then(([resp, templateFunc]) => {
                    console.log(resp);
                    res = resp.result;
                    let html = templateFunc({
                        res
                    });
                    $("#products").html(html);
                });
        },
    };
})(window);