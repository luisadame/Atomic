import Post from '../post';
import Source from '../source';
import Parser from '../parser';
import Loader from '../components/Loader';
import Router from '../router';
import AjaxPaginator from '../ajaxPaginator';

export default class Home {

	static async localInit(refresh = false) {
		// Show loader
		Loader.toggle();
		let sources = null;
		let nItems = 25;

		// Get already stored posts
		let cachedPosts = await Post.all();

		function afterRender() {
			// Hide loader
			Loader.toggle();
			// Change history
			Router.home();
			// Change document title
			document.querySelector('.current-section').textContent = 'All articles';
			// Change app state
			window.app.state = 'home';
		}

		// If we have saved posts and we dont want fresh data render inmediately
		if (cachedPosts.length && !refresh) {
			Post.paginate(nItems)
				.render(cachedPosts)
				.then(afterRender())
				.catch(e => {
					throw new Error(e);
				});
		}

		try {

			sources = await Source.all();
			Source.render(sources);

			let posts = [];
			let promises = [];

			for (let source of sources) {
				promises.push(
					fetch(window.app.proxy + source.url, {
						mode: 'cors'
					})
						.then(response => response.text())
						.then(data => {
							let parser = new Parser({
								data: data,
								source: source
							});
							posts.push(...parser.posts());
						})
				);
			}

			Promise.all(promises).then(() => {
				// save the posts that are not already stored
				let savedPostPromises = posts.map(post => {
					if (post.isUnique()) {
						post.save();
					}
				});

				// and fetch from db
				Promise.all(savedPostPromises).then(() => {
					if (refresh || !cachedPosts.length) {
						Post.paginate(nItems)
							.all()
							.then(Post.render)
							.then(afterRender())
							.catch(e => {
								throw new Error(e);
							});
					}
				});
			});
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			if (!sources.length) {
				Loader.toggle();
				Post.render([]);
				return;
			}
		}
	}

	static async remoteInit(refresh = false) {

		Loader.toggle();
		let nItems = 25;

		// Get already stored posts
		let cachedPosts = await Post.all();

		function afterRender() {
			// Hide loader
			Loader.toggle();
			// Change history
			Router.home();
			// Change document title
			document.querySelector('.current-section').textContent = 'All articles';
			// Change app state
			window.app.state = 'home';
		}

		// If we have saved posts and we dont want fresh data render inmediately
		if (cachedPosts.length && !refresh) {
			Post.paginate(nItems)
				.render(cachedPosts)
				.then(afterRender())
				.catch(e => {
					throw new Error(e);
				});
		} else {
			let $posts = document.querySelector('.posts');

			let firstRequest = fetch(`${window.app.backend}/posts`, window.app.fetchOptions());

			let paginator = new AjaxPaginator($posts);

			paginator.beforeRender = function () {
				this.isRendering = true;
				Loader.toggle();
				let request = fetch(this.endpoint, window.app.fetchOptions());
				return request
					.then(r => r.json())
					.then(this.load.bind(paginator))
					.then(() => {
						let reg = new RegExp(/\r\n|\n|\r|\t|\\/, 'gm');
						let promises = this._items.map(post => post.render());
						return Promise.all(promises).then(posts => {
							return posts.join('').trim().replace(reg, '');
						});
					});
			};

			paginator.afterRender = function () {
				const postTitles = document.querySelectorAll('.post__title');
				postTitles.forEach(title =>
					title.addEventListener('click', Post.loadPost, false)
				);
				this.isRendering = false;
				Loader.toggle();
			};

			firstRequest
				.then(r => r.json())
				.then(paginator.load.bind(paginator))
				.then(paginator.initialRender.bind(paginator));
		}
	}

	static async init(refresh = false) {
		if (window.app.authenticated) {
			await Home.remoteInit(refresh);
		} else {
			await Home.localInit(refresh);
		}
	}
}
