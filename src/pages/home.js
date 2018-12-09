import Post from '../post';
import Source from '../source';
import Parser from '../parser';
import Loader from '../components/Loader';
import Router from '../router';

export default class Home {
	static async init() {
		let sources;
		Loader.toggle();
		try {
			sources = await window.db.sources.allDocs({
				include_docs: true
			});
			sources = sources.rows.filter(row => row.doc.url).map(row => row.doc);
			Source.render(sources.map(Source.fromObject));
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			if (!sources.length) {
				Loader.toggle();
				Post.render([]);
				return;
			}
		}
		let posts = [];
		for (let source of sources) {
			let data = await fetch(window.app.proxy + source.url, {
				mode: 'cors',
			});
			data = await data.text();
			let parser = new Parser({
				data: data,
				source: source
			});
			posts.push(...parser.posts());
		}

		// save the posts that are not already stored
		for (let post of posts) {
			// eslint-disable-next-line no-unused-vars
			window.db.posts.get(post._id, (_, doc) => {
				if (_) {
					window.db.posts.put(post.toObject());
				}
			});
		}

		// and fetch from db
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
}
