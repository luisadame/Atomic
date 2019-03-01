import {
	throttle
} from './utils';
import Post from './post';
import Loader from './components/Loader';
export default class AjaxPaginator {

	constructor(container) {
		if (AjaxPaginator.instance) {
			return AjaxPaginator.instance;
		} else {
			this.container = container;
			this.endpoint = undefined;
			this.page = 0;
			AjaxPaginator.instance = this;
		}
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
		return this;
	}

	items(items) {
		this._items = items;
		return this;
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
		if (this.page === 1) {
			this.container.innerHTML = '';
		}
		this.container.insertAdjacentHTML('beforeend', items);
	}

	run() {
		if (!this.isRendering) {
			return this.beforeRender()
				.then(this.render.bind(this))
				.then(this.afterRender.bind(this));
		}
	}

	load(response) {
		let items = response.data.map(Post.fromObject);
		let nextPage = response.links.next;
		this.next(nextPage).items(items);

		return Promise.all(items.map(post => post.save()));
	}

	initialRender() {
		if (!window.app.authenticated) return;
		let reg = new RegExp(/\r\n|\n|\r|\t|\\/, 'gm');
		let promises = this._items.map(post => post.render());
		return Promise.all(promises)
			.then(posts => {
				return posts.join('').trim().replace(reg, '');
			})
			.then(results => {
				this.container.innerHTML = '';
				this.container.insertAdjacentHTML('beforeend', results);
			})
			.then(() => {
				const postTitles = document.querySelectorAll('.post__title');
				postTitles.forEach(title =>
					title.addEventListener('click', Post.loadPost, false)
				);
				this.isRendering = false;
				this.listen();
				Loader.toggle();
			});
	}
}
