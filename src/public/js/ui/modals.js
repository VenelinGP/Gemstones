((scope) => {
    const templates = window.templates;

    class Modal {
        constructor(type) {
            this.type = type;
            this.id = "modal-" + type + "-id";
            templates.getModal(this.type)
                .then((templateFunc) => {
                    this.modalHtml = `
                        <div id="${this.id}">
                            ${templateFunc(this.type)}
                        </div>
                    `;
                    console.log(this.modalHtml);
                });
        }

        show() {
            $(`#${this.id}`).remove();
            $("#modal-wrap").append(this.modalHtml);
            $(`#${this.id} .modal`).modal();
            return Promise.resolve(this);
        }

        hide() {
            $(`#${this.id} .modal`).modal("hide");
            $(`#${this.id}`).remove();
            return Promise.resolve(this);
        }
    }

    scope.modals = {
        get(modal) {
            console.log(modal);
            return new Modal(modal);
        }
    };
})(window);