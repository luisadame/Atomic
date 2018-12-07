import Post from '../post';
import Loader from '../components/Loader';
import Router from '../router';

export default class Favorites {
	static async init() {
		Loader.toggle();
		Router.go(`Favorited posts - ${window.app.name}`, '#/favorites');
		window.db.favorites().then(posts => {
			document.querySelector('.current-section').innerHTML = `Favorites <i class="fa fa-star"></i> - ${posts.length}`;
			// change app state
			window.app.state = 'favorites';
			// sort posts
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
