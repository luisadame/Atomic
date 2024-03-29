import {
	debounce
} from '../utils';
import Post from '../post';
import Loader from './Loader';

export default class Search {

	constructor() {
		this.$search = document.querySelector('.search');
		this.$search__input = this.$search.querySelector('.search__input');
		this.events = [{
			el: this.$search,
			event: 'click',
			handler: this.onClick
		},
		{
			el: this.$search__input,
			event: 'blur',
			handler: this.onBlur
		},
		{
			el: this.$search__input,
			event: 'keyup',
			handler: debounce(this.onKeyUp, 200)
		}
		];
	}

	onClick() {
		this.$search.classList.add('active');
		this.$search__input.focus();
	}

	onBlur() {
		if (this.$search__input.value.length) return;
		this.$search.classList.remove('active');
		this.$search__input.value = '';
	}

	onKeyUp(e) {
		const title = e.target.value;
		Loader.toggle();

		if (window.app.state === 'source') {
			const source = window.app.source;
			if (title.length > 0) {
				window.db.searchPostsInSource(title, source).then(posts => {
					if (!posts.length) {
						let $posts = document.querySelector('.posts');
						$posts.innerHTML = '<img src="/assets/img/no_data.svg" alt="No favorited articles or news" />';
						Loader.toggle();
						return;
					} else {
						Post.render(posts).then(Loader.toggle());
					}
				});
			} else {
				window.db.postsBySource(source).then(posts => {
					Post.render(posts).then(Loader.toggle());
				});
			}
		} else {
			if (title.length > 0) {
				window.db.searchPosts(title).then(posts => {
					if (!posts.length) {
						let $posts = document.querySelector('.posts');
						$posts.innerHTML = '<img src="/assets/img/no_data.svg" alt="No favorited articles or news" />';
						Loader.toggle();
						return;
					} else {
						Post.render(posts).then(Loader.toggle());
					}
				});
			} else {
				Post.all().then(posts => {
					Post.render(posts).then(Loader.toggle());
				});
			}
		}

	}

	listen() {
		this.events.forEach(ev => ev.el.addEventListener(ev.event, ev.handler.bind(this), false));
	}

	static listen() {
		const search = new Search();
		search.listen();
		return search;
	}
}
