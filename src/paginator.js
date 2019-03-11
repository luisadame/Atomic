import { throttle } from './utils';
export default class Paginator {

	constructor(nItems, container, items) {
		this.step = nItems;
		this.container = container;
		this.items = items;
		this.start = 0;
		this.end = this.step;
	}

	set step(n) {
		if (isNaN(n) && n > 0) throw new Error('Parameter passed needs to be an integer and greater than zero');
		this._step = n;
	}

	get step() {
		return this._step;
	}

	set container(container) {
		if (!(container instanceof HTMLElement)) throw new Error('Parameter has to be an element');
		this._container = container;
	}

	get container() {
		return this._container;
	}

	set items(items) {
		if(!Array.isArray(items)) throw new Error('Parameter passed needs to be an array of items');
		this._items = items;
	}

	get items() {
		return this._items;
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

	next() {
		this.start += this.step;
		this.end += this.step;
	}

	isNearBottom() {
		let document = window.document.documentElement,
			threshold = +(document.scrollHeight * 0.3).toFixed(2);

		return (window.scrollY + window.innerHeight) > (document.scrollHeight - threshold);
	}

	observeScroll() {
		if (this.isNearBottom()) {
			this.next();
			this.run();
		}
	}

	listen() {
		window.addEventListener('scroll', throttle(this.observeScroll.bind(this), 300));
		return this;
	}

	render(items) {
		if (this.start === 0) {
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
