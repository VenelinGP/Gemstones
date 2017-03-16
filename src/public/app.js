const url = "http://localhost:3000/api/all";
const handlebars = window.handlebars || window.Handlebars;

(() => {
    const root = null,
        useHash = false;

    let router = new Navigo(root);
    console.log("Here 1");
    router
        .on(() => {
            $.ajax({
                url,
                method: "GET",
                contentType: "application/json",
                success(resp) {
                    const users = resp;

                    templateHtml = `
                        <ul>
                            {{#each model}}
                                <li>
                                    {{username}}
                                </li>
                            {{/each}}
                        </ul>
                    `;
                    const compileFunc = handlebars.compile(templateHtml);
                    let html = compileFunc({ model: users });
                    console.log(html);
                    $("#page-placeholder").html(html);
                },
                error(err) {
                    console.log(err);
                }
            });
        })
        .resolve();
})();