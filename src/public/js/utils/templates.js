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
        // get(name) {
        //     const url = `/public/templates/${name}.html`;
        //     return this.getByUrl(url);
        // },

        // getModal(type) {
        //     const url = `/public/modals/${type}.html`;
        //     return this.getByUrl(url);
        // },
        getPage(name) {
            const url = `/pages/${name}/${name}.html`;
            return this.getByUrl(url);
        }
    };
})(window);