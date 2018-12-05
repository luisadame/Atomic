import Sidebar from '../src/components/sidebar';
import Router from '../src/router';
import Post from '../src/post';
import Model from './model';

export default class Source extends Model {
	constructor(url = 'http://example.com') {
		super();
		this._database = 'sources';
		this.attributes = ['url', 'title'];
		this.url = url;
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

	/**
	 * Sluggify the title.
	 */
	slug() {
		return this.title.split(' ').map(slice => slice.toLowerCase()).join('-');
	}

	render() {
		return `<a href="#/source/${this.slug()}">${this.title}</a>`;
	}

	/**
	 * Check if a source is unique in the database.
	 */
	isUnique() {
		return window.db[this._database].find({
			selector: {
				title: this.title,
				url: this.url
			}
		}).then(results => {
			return results.docs.length > 0;
		});
	}

	renderToSidebar() {
		let markup = `
		<li>
			<a class="source__link" href="#/source/${this.slug()}">${this.title}</a>
		</li>`;
		return markup;
	}

	static fromObject(object) {
		if (!object.title || !object.url) return;
		let source = new Source(object.url);
		source.title = object.title;
		return source;
	}

	static openSource(title) {
		let source = window.db.source(title);

		// fetch all posts by source
		Post.render(window.db.postsBySource(source));
		document.querySelector('.current-section').textContent = `Source: ${title}`;

		// change app state
		window.app.state = 'source';
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
			$sources.innerText = 'No sources added... yet :)';
			throw new Error('No sources');
		}
	}
}
