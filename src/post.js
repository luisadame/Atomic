export default class Post {
	constructor(title) {
		this.title = title;
	}

	set title(title) {
		this._title = title;
	}

	get title() {
		return this._title;
	}

	set content(content) {
		this._content = content;
	}

	get content() {
		return this._content;
	}

	set source(source) {
		this._source = source;
	}

	get source() {
		return this._source;
	}

	set image(image) {
		this._image = image;
	}

	get image() {
		return this._image;
	}

	loadImage() {
		let image = new Image();
		image.src = this.image;
		return image;
	}

	getImageSize() {
		// Load image
		let image = this.loadImage();
		return {
			w: image.naturalWidth,
			h: image.naturalHeight
		};
	}

	getPostSize() {
		let imageSize = this.getImageSize();
		let ratio = +(imageSize.w / imageSize.h).toFixed(2);
		return ratio < 1 ? 'long' : '';
	}

	render() {
		return `
			<article class="post ${this.getPostSize()}">
				<img class="post__img" src="${this.image}" alt="Article featured image">
				<div class="post__content">
					<h2 class="post__title">${this.title}</h2>
					<p class="post__source">${this.source.title}</p>
				</div>
			</article>
		`;
	}

	static render(posts) {
		let fragment = [];
		posts.forEach(post => fragment.push(post.render()));
		let $posts = document.querySelector('.posts');
		$posts.innerHTML = fragment.join('');
	}
}
