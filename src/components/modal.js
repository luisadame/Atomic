export default class Modal {
	constructor(html) {
		this.cloak = document.querySelector('.cloak');
		this.content = html;
		this.classes = [];
	}

	addlisteners() {
		this.$ok = document.querySelector('.modal__btn.js-ok');
		this.$cancel = document.querySelector('.modal__btn.js-cancel');
		this.$cancel.addEventListener('click', this.close);
		this.$ok.addEventListener('click', this.proceed.bind(this, this.$ok));
		this.cloak.addEventListener('click', this.close);
	}

	proceed() {

	}

	listen() {

		function onKeyDown(e) {
			if (e.key === 'Enter') {
				this.proceed(this.$ok);
			} else if (e.key === 'Escape') {
				this.close();
			}
		}

		let inputs = this.getContainer().querySelectorAll('.input-group input');
		let input = null;

		if (inputs.length > 1) {
			input = this.getContainer().querySelector('.input-group:last-child input');
		} else {
			input = inputs[0];
		}

		if (input) {
			input.addEventListener('keydown', onKeyDown.bind(this));
		}
		this.getContainer().addEventListener('keydown', onKeyDown.bind(this));
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

	getContainer() {
		return document.querySelector('#modal .container');
	}

	classNames() {
		this.classes = [...arguments];
	}

	toggleLoader() {
		let loader = document.querySelector('#modal .loader');
		if (loader) {
			loader.classList.toggle('show');
		}
	}

	open() {
		if (Modal.instance) return;
		this.cloak.classList.toggle('open');
		let markup = this.wrapper(this.content);
		document.body.insertAdjacentHTML('beforeend', markup);
		let modal = document.getElementById('modal');
		setTimeout(() => {
			modal.classList.add('open');
			modal.className += ' ' + this.classes.join(' ');
		}, 10);
		Modal.instance = this;
		this.addlisteners();
		this.listen();
		if (this.afterOpen) {
			this.afterOpen();
		}
	}

	close() {
		return new Promise(resolve => {
			// get modal
			let modal = document.getElementById('modal');
			modal.classList.remove('open');
			// close it
			setTimeout(() => {
				Modal.instance.cloak.classList.toggle('open');
				modal.remove();
				Modal.instance = null;
				resolve();
			}, 270);
		});
	}
}
