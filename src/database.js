export default class Database {
	constructor(repository) {
		this.repository = repository;
	}

	get posts() {
		return this.repository.posts;
	}

	get categories() {
		return this.repository.categories;
	}

	get sources() {
		return this.repository.sources;
	}

	category(name) {
		return this.categories.find(category => category.name === name);
	}

	categoryBySlug(slug) {
		return this.categories.find(category => category.slug() === slug);
	}

	post(name) {
		return this.posts.find(post => post.title === name);
	}

	searchPosts(title) {
		const pattern = new RegExp(`.*${title}.*`, 'i');
		return this.posts.filter(post => post.title.match(pattern));
	}

	source(title) {
		return this.sources.find(source => source.title === title);
	}

	postBySlug(slug) {
		return this.posts.find(post => post.slug() === slug);
	}
	postsBySource(source) {
		return this.posts.filter(post => post.source === source);
	}
}
