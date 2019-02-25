import {
	throttle
} from './utils';
export default class AjaxPaginator {

	constructor(container) {
        this.container = container;
        this.endpoint = null;
	}


	set container(container) {
		if (!(container instanceof HTMLElement)) throw new Error('Parameter has to be an element');
		this._container = container;
	}

	get container() {
		return this._container;
	}

	set beforeRender(callback) {
		this._beforeRender = callback.bind(this);
	}

	get beforeRender() {
		return this._beforeRender;
	}

	set afterRender(callback) {
		this._afterRender = callback.bind(this);
	}

	get afterRender() {
		return this._afterRender;
	}

	next(endpoint) {
		this.endpoint = endpoint;
    }

    items(items) {
        this.items = items;
    }

	isNearBottom() {
		let document = window.document.documentElement,
			threshold = +(document.scrollHeight * 0.3).toFixed(2);

		return (window.scrollY + window.innerHeight) > (document.scrollHeight - threshold);
	}

	observeScroll() {
		if (this.isNearBottom()) {
			this.run();
		}
	}

	listen() {
		window.addEventListener('scroll', throttle(this.observeScroll.bind(this), 300));
		return this;
	}

	render(items) {
		if (!this.endpoint) {
			this.container.innerHTML = '';
		}
		this.container.insertAdjacentHTML('beforeend', items);
	}

	run() {
		if (!this.isRendering) {
			this.beforeRender()
				.then(this.render.bind(this))
				.then(this.afterRender.bind(this));
		}
	}
}
