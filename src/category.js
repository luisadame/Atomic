import Router from './router';
import Post from './post';
import Sidebar from './components/sidebar';

export default class Category {
	constructor(name) {
		this.name = name;
		this.sources = [];
	}

	set name(name) {
		this._name = name;
	}

	get name() {
		return this._name;
	}

	set sources(sources) {
		this._sources = sources;
	}

	get sources() {
		return this._sources;
	}

	/**
	 * It creates an sluggified version from the name of the category.
	 */
	slug() {
		return this.name
			.split(' ')
			.map(slice => slice.toLowerCase())
			.join('-');
	}

	addSource(source) {
		this.sources.push(source);
	}

	render() {
		let markup = `<li>
			<a class="category__link" href="#/category/${this.slug()}">${this.name}</a>
			<ul>
				${this.sources.map(source => '<li>' + source.render() + '</li>').join('')}
			</ul>
		</li>`;
		return markup;
	}

	static loadCategory(e) {
		e.preventDefault();
		let name = e.target.textContent;
		Category.openCategory(name);
		Sidebar.get().close();
		Router.go(`${name} - ${window.app.name}`, e.target.href);
	}

	static openCategory(name) {
		let category = window.db.category(name);

		// fetch all posts by source
		let posts = [];
		for (let source of category.sources) {
			posts = [...posts, ...window.db.postsBySource(source)];
		}
		Post.render(posts);
		document.querySelector('.current-section').textContent = `Category: ${name}`;

		// change app state
		window.app.state = 'category';
	}

	static addListeners() {
		let category_links = document.querySelectorAll('.category__link');
		category_links.forEach(link => {
			link.addEventListener('click', Category.loadCategory, false);
		});
	}

	static render(categories) {
		let $categories = document.querySelector('.categories');
		if (categories.length) {
			let fragment = [];
			categories.forEach(category => fragment.push(category.render()));
			$categories.innerHTML = `<ul>${fragment.join('')}</ul>`;
			Category.addListeners();
		} else {
			$categories.innerHTML = '<div class="emptiness">No categories yet :)</div>';
		}
	}
}
