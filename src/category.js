export default class Category {
	constructor(name) {
		this.name = name;
		this.sources = [];
	}

	set title(title) {
		this._title = title;
	}

	get title() {
		return this._title;
	}

	addSource(source) {
		this.sources.push(source);
	}

	sources() {
		return this.sources;
	}
}
