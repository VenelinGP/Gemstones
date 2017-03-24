/* globals $ */
((scope) => {
    const contentId = "content";
    const contentSelector = `#${contentId}`;

    scope.content = {
        init(content) {
            return templates.get(content)
                .then((templateFunc) => {
                    const html = templateFunc({
                        id: contentId,
                    });
                    $(contentSelector).remove();
                    $("#content-wrap").html(html);
                });
        },
        // show() {
        //     $(contentSelector).removeClass("hidden");
        //     return this;
        // },
        // hide() {
        //     $(contentSelector).addClass("hidden");
        //     return this;
        // },
    };
})(window);