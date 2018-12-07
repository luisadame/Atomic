import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import {
	desluggify
} from '../src/utils';
import Post from './post';

export default class Database {
	constructor() {
		this.driver = PouchDB;
		const models = ['posts', 'categories', 'sources', 'saved'];
		PouchDB.plugin(find);
		models.forEach(model => {
			this[model] = new PouchDB(model);
		});
		this.posts.createIndex({
			index: {
				fields: ['title', 'timestamp', 'source', 'link']
			}
		});

		this.sources.createIndex({
			index: {
				fields: ['title', 'url']
			}
		});
	}

	set db(db) {
		if (!(db instanceof PouchDB)) throw new Error('Db has to be an instance of PouchDB');
		this._db = db;
	}

	get db() {
		return this._db;
	}

	validateDb(db) {
		if (!(db instanceof this.driver)) throw new Error(`Database has to be an instance of ${this.driver}`);
	}

	set posts(db) {
		this.validateDb(db);
		this._posts = db;
	}

	get posts() {
		return this._posts;
	}

	set saved(db) {
		this.validateDb(db);
		this._saved = db;
	}

	get saved() {
		return this._saved;
	}

	set sources(db) {
		this.validateDb(db);
		this._sources = db;
	}

	get sources() {
		return this._sources;
	}

	set categories(db) {
		this.validateDb(db);
		this._categories = db;
	}

	get categories() {
		return [];
	}

	category(name) {
		return this.categories.find(category => category.name === name);
	}

	categoryBySlug(slug) {
		return this.categories.find(category => category.slug() === slug);
	}

	post(name) {
		return this.posts.find({
			selector: {
				title: name
			}
		}).then(result => {
			return result.docs[0];
		});
	}

	searchPosts(title) {
		const pattern = new RegExp(`.*${title}.*`, 'i');
		return this.posts.find({
			selector: {
				title: {
					$regex: pattern
				}
			}
		}).then(result => {
			let posts = result.docs.map(Post.fromObject);
			return posts;
		}).catch(error => {
			throw new Error(error);
		});
	}

	source(title) {
		title = desluggify(title);
		return this.sources.find({
			selector: {
				$or: [
					{ title: { $regex: new RegExp(title, 'gi') } },
					{ url: { $regex: new RegExp(title, 'gi') } }
				]
			}
		}).then(result => {
			return result.docs[0];
		});
	}

	postById(id) {
		return this.posts.get(id)
			.then(function (doc) {
				return doc;
			}).catch(function (err) {
				throw new Error(err);
			});
	}

	postBySlug(slug) {
		let name = desluggify(slug);
		return this.posts.find({
			selector: {
				title: {
					$regex: new RegExp(name, 'gi')
				}
			}
		}).then(result => {
			return result.docs[0];
		});
	}

	favorites() {
		return this.posts.find({
			selector: {
				'isFavorite': true
			}
		}).then(results => {
			return results.docs.map(Post.fromObject);
		}).catch(e => {
			throw new Error(e);
		});
	}

	postsBySource(source) {
		return this.posts.find({
			selector: {
				'source._url': source.url
			}
		}).then(results => {
			return results.docs.map(Post.fromObject);
		}).catch(e => {
			throw new Error(e);
		});
	}

	static async save(data, database) {
		try {
			return await this.db[database].bulkDocs(data);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
	}
}
