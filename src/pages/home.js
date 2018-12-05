import Post from '../post';
import Source from '../source';
import Parser from '../parser';
import Loader from '../components/Loader';

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

		window.db.posts.bulkDocs(posts.map(post => post.toObject())).then(() => {
			posts = posts.sort(Post.sortByDate);
			Post.render(posts)
				.then(Loader.toggle())
				.catch(e => {
					throw new Error(e);
				});
		}).catch(e => {
			throw new Error(e);
		});
	}
}
