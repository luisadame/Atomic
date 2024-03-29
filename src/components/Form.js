import Validator from '../validation/Validator';

export default class Form {

	constructor(form, rules, action = null) {
		this.rules = rules;
		this.form = form;
		this.method = null;
		this.validator = new Validator(rules, form);
		this.action = action ? action : this.form.action;
		this.listenForValidation();
		this.listenForSubmition();
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
		let data = new FormData(this.form);
		data.append('_method', this.method);
		return data;
	}

	submit(method = 'POST') {
		this.method = method;
		return fetch(
			this.action,
			{method: 'POST', body: this.formData(), ...window.app.fetchOptions()}
		)
			.then(r => {
				return r.json().then(data => {
					return r.ok ? data : Promise.reject(data);
				});
			});
	}

	validate() {
		this.validator.make();
		return this.validator.isValid();
	}

	errors(input = null) {
		return input ? this.validator.errors[input] : this.validator.errors;
	}

	hasErrors() {
		return Object.keys(this.errors()).length > 0;
	}

	errorToHtml(message) {
		return `
			<div class="error">
				${message}
			</div>
		`;
	}

	removeAllErrorElements() {
		this.form.querySelectorAll('.has-errors').forEach(group => {
			group.classList.remove('has-errors');
			let errorMsg = group.querySelector('.error');
			if (errorMsg) {
				errorMsg.remove();
			}
		});
	}

	displayErrors() {
		if (this.hasErrors()) {
			for (let input of Object.keys(this.rules)) {
				this.displayError(input);
			}
			this.form.querySelector('.has-errors [name]').focus();
		} else {
			this.removeAllErrorElements();
		}
	}

	displayError(input) {
		let $formGroup = this.form.querySelector(`[name="${input}"]`).closest('.input-group');
		let $error = $formGroup.querySelector('.error');
		if (this.errors(input)) {
			$formGroup.classList.remove('is-valid');
			$formGroup.classList.add('has-errors');
			let $formGroupInput = $formGroup.querySelector('.is-valid');
			if ($formGroupInput) {
				$formGroupInput.classList.replace('is-valid', 'has-errors');
			}
			if ($error) {
				$error.innerText = this.errors(input);
			} else {
				$formGroup.insertAdjacentHTML('beforeend', this.errorToHtml(this.errors(input)));
			}
		} else {
			$formGroup.classList.remove('has-errors');
			$formGroup.classList.add('is-valid');
			if ($error) {
				$error.remove();
			}
		}
	}

	rulesToElements() {
		return Object.keys(this.rules).map(ruleName => this.form.querySelector(`[name="${ruleName}"]`));
	}

	listenForValidation() {
		this.rulesToElements().forEach(input => {
			input.addEventListener('input', this.validateInput.bind(this), false);
		});
	}

	listenForSubmition() {
		this.form.addEventListener('submit', e => {
			e.preventDefault();
		});
	}

	removeError(name) {
		let $formGroup = this.form.querySelector(`[name="${name}"]`).closest('.input-group');
		let $error = $formGroup.querySelector('.error');
		$formGroup.classList.remove('has-errors');
		if ($error) {
			$error.remove();
		}
	}

	makeSuccessful(name) {
		let $input = this.form.querySelector(`[name="${name}"]`);
		$input.classList.add('is-valid');
	}

	validateInput(e) {
		let name = e.target.name;
		this.validator.validateInput(name);
		if (this.errors(name)) {
			this.displayError(name);
			e.target.classList.remove('is-valid');
		} else {
			this.removeError(name);
			this.makeSuccessful(name);
		}
	}
}
