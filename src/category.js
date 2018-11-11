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

	addSource(source) {
		this.sources.push(source);
	}

	render() {
		let markup = `<li>${this.name}</li>`;
		return markup;
	}

	static render(categories) {
		let fragment = [];
		categories.forEach(category => fragment.push(category.render()));
		let $categories = document.querySelector('.categories');
		$categories.innerHTML = `<ul>${fragment.join('')}</ul>`;
	}
}
