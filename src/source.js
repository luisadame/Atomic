export default class Source {
	constructor(url) {
		this.url = url;
	}

	set url(url) {
		// eslint-disable-next-line
		const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
		if (!url.match(pattern)) throw new Error('Invalid url given');
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

	/**
	 * Sluggify the title.
	 */
	slug() {
		return this.title.split(' ').map(slice => slice.toLowerCase()).join('-');
	}

	render() {
		return `<a href="#/source/${this.slug()}">${this.title}</a>`;
	}
}
