import Validator from '../validation/Validator';

export default class Form {

	constructor(form, rules) {
		this.rules = [];
		this.form = form;
		this.validator = new Validator(rules, form);
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

	formData() {
		return new FormData(this.form);
	}

	validate() {
        this.validator.make();
        return this.validator.isValid();
    }

    errors() {
        return this.validator.errors;
    }
}
