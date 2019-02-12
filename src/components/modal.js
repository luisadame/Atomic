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

	classNames() {
		this.classes = [...arguments];
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
		if (this.afterOpen) {
			this.afterOpen();
		}
	}

	close() {
		// get modal
		let modal = document.getElementById('modal');
		modal.classList.remove('open');
		// close it
		setTimeout(() => {
			Modal.instance.cloak.classList.toggle('open');
			modal.remove();
			Modal.instance = null;
		}, 270);
	}
}
