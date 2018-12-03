export default class Modal {
    constructor(html) {
        this.cloak = document.querySelector('.sidebar__cloak');
        this.content = html;
    }

    addlisteners() {
        this.$ok = document.querySelector('.modal__btn.js-ok');
        this.$cancel = document.querySelector('.modal__btn.js-cancel');
        this.$cancel.addEventListener('click', this.close);
        this.$ok.addEventListener('click', this.proceed);
    }

    proceed() {

    }

    static set instance(object) {
        // if(!(object instanceof Modal) || object !== null) throw new Error('Object given should be an instance of Modal');
        this._instance = object;
    }

    static get instance() {
        return this._instance;
    }

    wrapper(html) {
        return `<div id="modal">${html}</div>`;
    }

    open() {
        if (Modal.instance) return;
        this.cloak.classList.toggle('open')
        let markup = this.wrapper(this.content);
        document.body.insertAdjacentHTML('beforeend', markup);
        Modal.instance = this;
        this.addlisteners();
    }

    close() {
        // get modal
        let modal = document.getElementById('modal');
        // close it
        modal.remove();
        Modal.instance = null;
    }
}
