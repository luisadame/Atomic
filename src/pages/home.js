import Post from '../post';
import Source from '../source';
import Parser from '../parser';
import Loader from '../components/Loader';
import Router from '../router';

export default class Home {
	static async init(refresh = false) {
		let sources;
		Loader.toggle();

		let cachedPosts = await Post.all();

		if (cachedPosts.length && !refresh) {
			Post.render(cachedPosts)
				.then(() => {
					Loader.toggle();
					Router.home();
					document.querySelector('.current-section').textContent = 'All articles';
					// change app state
					window.app.state = 'home';
				})
				.catch(e => {
					throw new Error(e);
				});
		}

		try {
			sources = await window.db.sources.allDocs({
				include_docs: true
			});
			sources = sources.rows.filter(row => row.doc.url).map(row => row.doc);
			Source.render(sources.map(Source.fromObject));

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

				let savedPostPromises = [];

				for (let post of posts) {
					let savePost = window.db.posts.put(post.toObject()).catch(e => console.log(e));
					savedPostPromises.push(savePost);
				}

				// and fetch from db
				Promise.all(savedPostPromises).then(() => {
					if (refresh || !cachedPosts.length) {
						Post.all().then(posts => {
							Post.render(posts)
								.then(() => {
									Loader.toggle();
									Router.home();
									document.querySelector('.current-section').textContent = 'All articles';
									// change app state
									window.app.state = 'home';
								})
								.catch(e => {
									throw new Error(e);
								});
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
}
