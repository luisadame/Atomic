import Modal from './modal';

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
					<h2 class="post__title">
						<a href="/post/${this.title}">
							${this.title}
						</a>
					</h2>
					<p class="post__source">${this.source.title}</p>
				</div>
			</article>
		`;
	}

	// todo: refactor name to getPostElement
	static getParent(e) {
		let parent = e.target.parentElement;
		while (!parent.classList.contains('post')) parent = parent.parentElement;
		return parent;
	}

	/**
	 * When a post title is clicked this is fired, we'll
	 * look in the database for the post, retrieve it.
	 * Then, we get the post element to calculate rects.
	 * Build the markup to be injected in the page in order
	 * to show the detailed version of the post.
	 */
	static loadPost(e) {
		e.preventDefault();
		let post = window.db.post(e.target.textContent.trim());
		let position = Post.getParent(e).getBoundingClientRect();
		Modal.from(post, position).init();
	}

	static render(posts) {
		let fragment = [];
		posts.forEach(post => fragment.push(post.render()));
		let $posts = document.querySelector('.posts');
		$posts.innerHTML = fragment.join('');
		const postTitles = document.querySelectorAll('.post__title');
		postTitles.forEach(title =>
			title.addEventListener('click', Post.loadPost, false)
		);
	}
}
