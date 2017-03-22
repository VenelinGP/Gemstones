/* globals $ */

const templates = window.templates;

((scope) => {
    const footerId = "footer";
    const footerSelector = `#${footerId}`;

    scope.footer = {
        init() {
            return templates.get("footer")
                .then((templateFunc) => {
                    const html = templateFunc({
                        id: footerId,
                    });

                    $(footerSelector).remove();
                    $("#footer-wrap").append(html);
                });
        },
        show() {
            $(footerSelector).removeClass("hidden");
            return this;
        },
        hide() {
            $(footerSelector).addClass("hidden");
            return this;
        },
    };
})(window);