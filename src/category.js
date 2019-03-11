import Router from './router';
import Post from './post';
import Sidebar from './components/sidebar';
import Model from './model';
import Source from './source';
import { desluggify } from './utils';
import config from './config';
import Loader from './components/Loader';
import Options from './components/options';
import Home from './pages/home';

export default class Category extends Model {
	constructor(name) {
		super();
		this.name = name;
		this.sources = [];
		this.attributes = ['_id', 'name', 'sources'];
		this._database = 'categories';
		this.fillable = ['id', 'name'];
		Category.endpoint = config.backend + '/categories';
		Category.routeKeyName = 'name';
	}

	get _id() {
		return String(this.id);
	}

	static get attributes() {
		return {
			_id: 'int',
			name: 'string',
			sources: 'array'
		};
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

	removeSource(source) {
		if (!source.url) return;
		let found = this.sources.findIndex(source => source.url === source.url);
		this.sources.splice(found, 1);
		this.update();
	}

	addSource(source) {
		this.sources.push(source);
		this.update();
	}

	render() {
		let markup = `<li>
			<a class="category__link" href="#/category/${this.slug()}">${this.name}</a>
			<ul>
				${this.sources.map(source => '<li>' + Source.fromObject(source).render() + '</li>').join('')}
			</ul>
		</li>`;
		return markup;
	}

	isUnique() {
		return window.db[this._database].get(this._id)
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}

	static fromObject(object) {
		if (!object.name) return;
		let category = new Category(object.name);
		category.id = object._id ? object._id : object.id;
		category.sources = object.sources ? object.sources : [];
		return category;
	}

	static loadCategory(e) {
		e.preventDefault();
		let name = e.target.textContent;
		Category.openCategory(name);
		Sidebar.get().close();
		Router.go(`${name} - ${window.app.name}`, e.target.href);
	}

	static openCategoryBySlug(slug) {
		Category.openCategory(desluggify(slug));
	}

	static async renderCategoryPosts(sources) {
		let posts = [];
		for (let source of sources) {
			posts = [...posts, ...await window.db.postsBySource(source)];
		}
		posts = posts.sort(Post.sortByDate);
		if (!posts.length) {
			let $posts = document.querySelector('.posts');
			$posts.innerHTML = '<img src="/assets/img/empty.svg" alt="No favorited articles or news" />';
			return;
		} else {
			Post.render(posts);
		}
	}

	static async openCategory(name) {
		if (window.app.authenticated) {
			Loader.toggle();
			let category = null;
			return fetch(this.endpoint + `/${name}`, window.app.fetchOptions())
				.then(r => r.json())
				.then(({data}) => {
					category = Category.fromObject(data);
					return window.db.category(data.name)
						.then(doc => {
							return window.db.categories.put({
								_rev: doc._rev,
								...category.toObject()
							});
						})
						.then(result => {
							if (result.ok) {
								return category;
							}
						});
				})
				.then(result => {
					if (!result) {
						return Home.init();
					} else {
						category = result;
						return this.renderCategoryPosts(result.sources);
					}
				})
				.then(() => {
					document.querySelector('.current-section').textContent = `Category: ${category.name}`;
					// change app state
					window.app.state = 'category';
					window.app.category = Category.fromObject(category);
					Loader.toggle();
				}).catch(() => {
					return Home.init();
				});
		} else {
			let category = await window.db.category(name);
			if (!category) {
				Home.init();
			} else {

				// fetch all posts by source
				await this.renderCategoryPosts(category.sources);
				document.querySelector('.current-section').textContent = `Category: ${name}`;

				// change app state
				window.app.state = 'category';
				window.app.category = Category.fromObject(category);
			}
		}
	}

	static addListeners() {
		let category_links = document.querySelectorAll('.category__link');
		category_links.forEach(link => {
			link.addEventListener('click', Category.loadCategory, false);
		});
	}

	static render(categories) {
		categories = categories.filter(c => c !== undefined);
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

	static all() {
		return window.db.categories.allDocs({include_docs: true})
			.then(result => {
				let categories = result.rows.filter(row => row.doc.name)
					.map(row => Category.fromObject(row.doc))
					.sort((a, b) => {
						return a.name - b.name;
					});
				return categories;
			})
			.catch(e => {
				throw new Error(e);
			});
	}

	static delete() {
		if (window.app.category) {
			let category = window.app.category;
			Loader.toggle();
			category.delete(true)
				.then(() => {
					Loader.toggle();
					window.app.category = null;
					Options.toggle();
					Category.all().then(Category.render);
					Home.init(true);
					Sidebar.get().init();
				});
		}
	}
}
