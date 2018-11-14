import Modal from './modal';
import Source from './source';

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
		if (!(source instanceof Source))
			throw new Error('Invalid source object given');
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

	/**
	 * It creates an sluggified version from the title.
	 */
	slug() {
		return this.title
			.split(' ')
			.map(slice => slice.toLowerCase())
			.join('-');
	}

	/**
	 * It loads an image.
	 */
	loadImage() {
		return new Promise(res => {
			let image = new Image();
			image.onload = () => res(image);
			image.src = this.image;
		});
	}

	/**
	 * Returns the natural size of an image.
	 */
	getImageSize() {
		// Load image
		return this.loadImage().then(image => {
			return {
				w: image.naturalWidth,
				h: image.naturalHeight
			};
		});
	}

	/**
	 * Calculate the aspect ratio of the image
	 * and returns whether a post is "long" or wide.
	 */
	async getPostSize() {
		let imageSize = await this.getImageSize();
		let ratio = +(imageSize.w / imageSize.h).toFixed(2);
		return ratio < 1 ? 'long' : '';
	}

	/**
	 * It returns the markup to be injected in the posts section.
	 */
	async render() {
		const size = await this.getPostSize();
		return `
			<article class="post ${size}">
				<img class="post__img" src="${this.image}" alt="Article featured image">
				<div class="post__content">
					<h2 class="post__title">
						<a href="/post/${this.slug()}">
							${this.title}
						</a>
					</h2>
					<p class="post__source">${this.source.title}</p>
				</div>
			</article>
		`;
	}

	/**
	 * It returns the node element with class "post"
	 * that is a parent of the element where the event occurs.
	 * Todo: maybe this should be in other file.
	 */
	static getParent(node) {
		let parent = node.parentElement;
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
		let position = Post.getParent(e.target).getBoundingClientRect();
		Modal.from(post, position).init();
	}

	/**
	 * Open a post screen when a slug is passed.
	 * @param {string} slug
	 */
	static openPost(slug) {
		let post = window.db.postBySlug(slug);
		let position = {
			width: 0,
			height: 0,
			top: 0,
			left: 0
		};
		Modal.from(post, position).init();
	}

	static async render(posts) {
		let fragment = [];
		for (let post of posts) {
			let markup = await post.render();
			fragment.push(markup);
		}
		let $posts = document.querySelector('.posts');
		$posts.innerHTML = fragment.join('');
		const postTitles = document.querySelectorAll('.post__title');
		postTitles.forEach(title =>
			title.addEventListener('click', Post.loadPost, false)
		);
	}
}
