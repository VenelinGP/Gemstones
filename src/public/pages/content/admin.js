/* globals $ */

((scope) => {
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

    scope.admin = {
        init() {
            const url = window.baseUrl + "gemstone";
            Promise
                .all([http.get(url), templates.getPage("top-products")])
                .then(([resp, templateFunc]) => {
                    res = resp.result;
                    console.log(res);
                    let html = templateFunc({
                        res
                    });
                    $("#top-products").html(html);

                    $("#btn-add-gemstone").on("click", () => {
                        helperFuncs.addFormEvents();
                    });
                });

        }
    };
})(window);