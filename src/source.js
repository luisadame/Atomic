import Sidebar from '../src/components/sidebar';
import Router from '../src/router';
import Post from '../src/post';
import Model from './model';
import Loader from './components/Loader';
import Home from './pages/home';
import Options from './components/options';
import config from './config';

export default class Source extends Model {
	constructor(url = 'http://example.com') {
		super();
		this._database = 'sources';
		this.attributes = ['_id', 'id', 'url', 'title'];
		this.fillable = ['url', 'title', 'description', 'icon'];
		this.url = url;
		this.endpoint = config.backend + '/sources';
		this.routeKeyName = 'url';
	}

	get _id() {
		return this.url;
	}

	static get attributes() {
		return {
			url: 'string',
			title: 'string'
		};
	}

	set url(url) {
		// eslint-disable-next-line
		const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
		if (!url.match(pattern)) throw new Error('Invalid url given');
		this._url = url;
	}

	get url() {
		return this._url;
	}

	set title(title) {
		this._title = title;
	}

	get title() {
		return this._title;
	}

	set description(description) {
		this._description = description;
	}

	get description() {
		return this._description;
	}

	set icon(icon) {
		this._icon = icon;
	}

	get icon() {
		return 'http://example.com';
	}

	/**
	 * Sluggify the title.
	 */
	slug() {
		return this.title.split(' ').map(slice => slice.toLowerCase()).join('-');
	}

	render() {
		return `<a href="#/source/${this.url}">${this.title}</a>`;
	}

	/**
	 * Check if a source is unique in the database.
	 */
	isUnique() {
		return window.db[this._database].get(this._id)
			.catch(e => {
				if (e.status === 404) {
					return true;
				}
			})
			.then(doc => {
				if (doc) {
					return false;
				}
			});
	}

	renderToSidebar() {
		let markup = `
		<li>
			<a class="notranslate" translate="no" class="source__link" href="#/source/${this.url}">${this.title}</a>
		</li>`;
		return markup;
	}

	static delete() {
		if (window.app.source) {
			let source = window.app.source;
			source.delete(true)
				.then(() => {
					// delete them from posts
					Loader.toggle();
					window.db.deleteBySource(source.url).then(() => {
						Loader.toggle();
						window.app.source = null;
						Options.toggle();
						Home.init();
						Sidebar.get().init();
					});
				});
		}
	}

	static fromObject(object) {
		if (!object.title || !object.url) return;
		let source = new Source(object.url);
		source.title = object.title;
		return source;
	}

	static openSource(url) {
		Loader.toggle();
		window.db.sources.get(url).then(source => {
			// fetch all posts by source
			window.db.postsBySource(source).then(posts => {
				posts = posts.sort(Post.sortByDate);
				Post.render(posts).then(() => { Loader.toggle(); });
				document.querySelector('.current-section').textContent = `Source: ${source.title}`;

				// change app state
				window.app.state = 'source';
				source = Source.fromObject(source);
				window.app.source = source;
				Router.go(`${source.title} - ${window.app.name}`, `#/source/${source.url}`);
			});
		})
			.catch(() => {
				Home.init();
			});
	}

	static loadSource(e) {
		e.preventDefault();
		let title = e.target.textContent;
		Source.openSource(title);
		Sidebar.get().close();
		Router.go(`${title} - ${window.app.name}`, e.target.href);
	}

	static addListeners() {
		let source_link = document.querySelectorAll('.source__link');
		source_link.forEach(link => {
			link.addEventListener('click', Source.loadSource, false);
		});
	}

	static render(sources) {
		let $sources = document.querySelector('.sources');
		if (sources.length) {
			let fragment = [];
			sources.forEach(source => fragment.push(source.renderToSidebar()));
			$sources.innerHTML = `<ul>${fragment.join('')}</ul>`;
			Source.addListeners();
		} else {
			$sources.innerHTML = '<div class="emptiness">No sources added... yet :)</div>';
		}
	}

	static all() {
		return window.db.sources.allDocs({include_docs: true})
			.then(result => {
				let sources = result.rows.filter(row => row.doc.url)
					.map(row => Source.fromObject(row.doc));
				return sources;
			})
			.catch(e => {
				throw new Error(e);
			});
	}
}
