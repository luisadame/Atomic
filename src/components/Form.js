export default class Form {

    constructor(form) {
        this.rules = [];
        this.form = form;
    }

    get form() {
        return this._form;
    }

    set form(form) {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('Form must be a form element');
        }
        this._form = form;
    }

    get rules() {
        return this._rules;
    }

    set rules(rules) {
        if (!Array.isArray(rules)) {
            throw new Error('Rules must be an array of rules');
        }
        this._rules = rules;
    }

    formData() {
        return new FormData(this.form);
    }

    validate() {
        for (let rule of this.rules) {

        }
    }
}
