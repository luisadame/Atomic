export default class Source {
	constructor(url) {
		this.url = url;
	}

	set url(url) {
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
}
