const http = window.http;
const handlebars = window.handlebars || window.Handlebars;

((scope) => {
    scope.templates = {
        getByUrl(url) {
            return http.get(url)
                .then((templateHtml) => {
                    const templateFunc = handlebars.compile(templateHtml);
                    return templateFunc;
                });
        },
        get(name) {
            const url = `/public/templates/${name}.hbs`;
            return this.getByUrl(url);
        },

        getModal(type) {
            const url = `/public/modals/${type}.hbs`;
            return this.getByUrl(url);
        },
        getPage(name) {
            const url = `/pages/${name}/${name}.hbs`;
            return this.getByUrl(url);
        }
    };
})(window);