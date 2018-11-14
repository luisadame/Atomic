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

	post(name) {
		return this.posts.find(post => post.title === name);
	}

	postBySlug(slug) {
		return this.posts.find(post => post.slug() === slug);
	}
}
