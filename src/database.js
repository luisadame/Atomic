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
		return this.repository.categories.find(name);
	}

	post(name) {
		return this.repository.posts.find(post => post.title === name);
	}
}
