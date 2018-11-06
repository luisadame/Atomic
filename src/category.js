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

	addSource(source) {
		this.sources.push(source);
	}

	sources() {
		return this.sources;
	}

	render() {
		return `
			<li>${this.name}</li>
		`;
	}

	static render(categories) {
		let fragment = [];
		categories.forEach(category => fragment.push(category.render()));
		let $categories = document.querySelector('.categories');
		$categories.innerHTML = `<ul>${fragment.join('')}</ul>`;
	}
}
