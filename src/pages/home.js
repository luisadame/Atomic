import Post from '../post';
import Source from '../source';
import Parser from '../parser';
import Loader from '../components/Loader';
import Router from '../router';

export default class Home {
	static async init(refresh = false) {
		// Show loader
		Loader.toggle();
		let sources = null;

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
			Post.render(cachedPosts)
				.then(afterRender())
				.catch(e => {throw new Error(e);});
		}

		try {

			sources = await Source.all();
			Source.render(sources);

			let posts = [];
			let promises = [];

			for (let source of sources) {
				promises.push(
					fetch(window.app.proxy + source.url, {mode: 'cors'})
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
				// eslint-disable-next-line no-console
				let savedPostPromises = posts.map(post => window.db.posts.put(post.toObject()).catch(e => console.log(e)));

				// and fetch from db
				Promise.all(savedPostPromises).then(() => {
					if (refresh || !cachedPosts.length) {
						Post.all()
							.then(Post.render)
							.then(afterRender())
							.catch(e => {throw new Error(e);});
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
}
