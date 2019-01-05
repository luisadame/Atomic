import Post from '../post';
import Loader from '../components/Loader';
import Router from '../router';

export default class Saved {
	static async init() {
		Loader.toggle();
		Router.go(`Saved posts - ${window.app.name}`, '#/saved');
		try {
			// retrieve posts
			let savedPosts = await window.db.saved.allDocs({include_docs: true});
			// change page title
			document.querySelector('.current-section').innerHTML = `Saved posts for offline reading <i class="fa fa-hdd"></i> - ${savedPosts.total_rows}`;
			// change app state
			window.app.state = 'source';
			// filter and map them
			savedPosts = savedPosts.rows.filter(row => row.doc.title).map(row => {
				return Post.fromObject(row.doc);
			});
			// sort them by date
			savedPosts = savedPosts.sort(Post.sortByDate);
			// render them
			if (!savedPosts.length) {
				let $posts = document.querySelector('.posts');
				$posts.innerHTML = '<img src="/assets/img/store.svg" alt="No saved articles or news" />';
				Loader.toggle();
				return;
			} else {
				Post.render(savedPosts).then(() => {
					Loader.toggle();
				});
			}
		} catch (e) {
			throw new Error(e);
		}
	}
}
