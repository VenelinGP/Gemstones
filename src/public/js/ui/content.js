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
                })
                .then(() => {
                    this.tabs();
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
        tabs() {
            $tabs = $("#info .tabs");
            let $items = $tabs.find(">li>a");
            // console.log("Tabs: " + $items.length);
            let current = 0;
            $panes = $("#info .main .pane");
            // console.log("Panes: " + $panes.length);
            $panes.hide();
            $items.eq(current).addClass("active");
            $panes.eq(current).show();
            $items.click(function(ev) {
                ev.preventDefault();
                index = $items.index(this);
                $panes.eq(current).fadeOut(function() {
                    $panes.eq(index).fadeIn();
                    current = index;
                });
            });
            return false;

        }
    };
})(window);