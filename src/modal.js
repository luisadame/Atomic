import Post from '../src/post';

export default class Modal {
	constructor() {

	}

	set from(position) {
		if (!(['width', 'height', 'top', 'left'].every(p => position.hasOwnProperty(p)))) throw new Error('position should be of type DOMRect');
		this._from = {
			width: position.width,
			height: position.height,
			top: position.top,
			left: position.left
		};
	}

	get from() {
		return `top: ${this._from.top}px; left: ${this._from.left}px; width: ${this._from.width}px; height: ${this._from.height}px`;
	}

	setFromPost(post) {
		if (!(post instanceof Post)) throw new Error('post should be of type Post');
		for (let property in post) {
			this[property.substr(1)] = post[property];
		}
	}

	async init() {
		let markup = await this.render();
		await this.inject(markup);
		await this.setProperties();
		await this.open();
		await this.addListeners();
	}

	async setProperties() {
		this.modal = document.body.querySelector('.post--modal');
		this.events = [{
			el: this.modal.querySelector('.post--modal__back'),
			event: 'click',
			fn: this.destroy
		},
		{
			el: this.modal,
			event: 'transitionend',
			fn: () => {
				if (!this.open) this.modal.remove();
			}
		},
		{
			el: window,
			event: 'keypress',
			fn: e => {
				if (e.key === 'Escape') this.destroy();
			}
		}
		];
	}

	async destroy() {
		await this.close();
		await this.removeListeners();
	}

	async inject(markup) {
		document.body.insertAdjacentHTML('beforeend', markup);
	}

	async open() {
		this.open = true;
		document.body.classList.add('modal-opened');
		setTimeout(() => {
			this.modal.classList.add('active');
		}, 20);
	}

	async close() {
		this.open = false;
		document.body.classList.remove('modal-opened');
		this.modal.classList.remove('active');
		this.modal.classList.add('closing');
	}

	async removeListeners() {
		this.events.forEach(event => {
			event.el.removeEventListener(event.event, event.fn.bind(this));
		});
	}

	async addListeners() {
		this.events.forEach(event => {
			event.el.addEventListener(event.event, event.fn.bind(this), false);
		});
	}

	async render() {
		return `
            <article class="post--modal" style="${this.from}">
				<button class="post--modal__back">Back</button>
				<img class="post__img" src="${this.image}" alt="Article featured image">
				<div class="post--modal__container">
					<h2 class="post__title">${this.title}</h2>
					<div class="post__content">${this.content}</div>
					<p class="post__source">${this.source.title}</p>
				</div>
			</article>
	    `;
	}

	static from(post, position) {
		let modal = new Modal();
		modal.setFromPost(post);
		modal.from = position;
		return modal;
	}
}
