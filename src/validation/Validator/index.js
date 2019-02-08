
export default class Validator {
    constructor(rules, form) {
        this.rules = rules;
        this.form = form;
        this.errors = null;
    }

    get rules() {
        return this._rules;
    }

    set rules(rules) {
        if (typeof rules !== 'object') {
            throw new Error('Rules must be an object with rules');
        }
        this._rules = rules;
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

    buildValidations(validations) {
        validations = validations.split('|');
        return validations.map(validation => {
            if (validation.includes(':')) {
                [validation, param] = validation.split(':');
            }
            return {
                name: validation,
                param: param ? param : null
            };
        })
    }

    make() {
        for (let name in this.rules) {
            let value = this.form.querySelector(`[name=${name}]`).value;
            if (!value) throw new Error(`Element ${name} is not within the form.`);
            for (let rule of this.buildValidations(this.rules[name])) {
                if (rule.param) {
                    if (!this[rule.name](value, rule.param)) {
                        this.errors[name] = this.message(rule.name, rule.param);
                    }
                } else {
                    if (!this[rule.name](value)) {
                        this.errors[name] = this.message(rule.name);
                    }
                }
            }
        }
    }

    message(name, param = null) {
        return
    }

    isValid() {
        return this.messages === null;
    }

    messages() {
        return this.messages;
    }
}
