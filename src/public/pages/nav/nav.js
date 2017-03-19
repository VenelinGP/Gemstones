/* globals $ */
const modals = window.modals;

((scope) => {
    const modalLogin = modals.get("login");
    const modalRegister = modals.get("register");
    const helperFuncs = {
        createBook(bookToAdd) {
            const url = window.baseUrl + "books";

            loader.show();

            $("#loader .loader-title").html("Creating Book");
            Promise.all([http.postJSON(url, bookToAdd), templates.get("book-item")])
                .then(([book, templateFunc]) => {
                    let html = templateFunc({
                        model: book
                    });

                    $(".list-books").append(html);

                    loader.hide();
                    modalAddBook.hide();
                })
                .catch((err) => {
                    loader.hide();
                    notifier.error(`${bookToAdd.title} not created! ${err}`);
                    console.log(JSON.stringify(err)); // eslint-disable-line no-console
                });
        },
        addFormEvents() {
            const $form = $("#form-add-book");
            $form.on("submit", function() {
                let genres = [];
                // $("input[name=genres]:checked")
                //     .each((index, genreEl) => {
                //         genres.push($(genreEl).val());
                //     });

                // const book = {
                //     title: $("#tb-title").val(),
                //     description: $("#tb-description").val(),
                //     genres
                // };

                // helperFuncs.createBook(book);

                return false;
            });
        }
    };
    const initial = () => {
        const url = window.baseUrl + "users";
        Promise.all([http.get(url), templates.getPage("nav")])
            .then(([resp, templateFunc]) => {
                if (resp.result === "unauthorized!") {
                    res = false;
                } else {
                    res = resp.result;
                }
                let html = templateFunc({
                    res
                });
                $("#nav-wrap").html(html);

                $("#btn-login-modal").on("click", () => {
                    modalLogin.show()
                        .then(() => {
                            helperFuncs.addFormEvents();
                        });
                });
                $("#btn-register-modal").on("click", () => {
                    modalRegister.show()
                        .then(() => {
                            helperFuncs.addFormEvents();
                        });
                });
            });

    };
    scope.nav = {
        initial
    };
})(window.controllers = window.controllers || {});