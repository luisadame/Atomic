import Model from './model';
import Modal from './modal';
import Source from './source';

export default class Post extends Model {
	constructor(title = null) {
		super();
		this._database = 'posts';
		this.title = title;
		this.isRead = false;
		this.isFavorite = false;
		this.attributes = ['title', 'image', 'timestamp', 'link', 'content', 'source', 'isRead', 'isFavorite'];
	}

	static get attributes() {
		return {
			title: 'string',
			image: 'string',
			timestamp: 'string',
			link: 'string',
			content: 'string',
			source: Source
		};
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

	set isRead(state) {
		if (typeof state !== 'boolean') throw new Error('Only booleans are allowed for setting read status');
		this._read = state;
	}

	get isRead() {
		return this._read;
	}

	set isFavorite(state) {
		if (typeof state !== 'boolean') throw new Error('Only booleans are allowed for setting favorite status');
		this._favorite = state;
	}

	get isFavorite() {
		return this._favorite;
	}

	set link(link) {
		this._link = link;
	}

	get link() {
		return this._link;
	}

	set timestamp(time) {
		this._timestamp = time;
	}

	get timestamp() {
		return this._timestamp;
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
		return new Promise((res, rej) => {
			let image = new Image();
			image.onload = () => res(image);
			image.onerror = () => rej(new Error(`Failed to load image: ${this.image}`));
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
		try {
			let imageSize = await this.getImageSize();
			let ratio = +(imageSize.w / imageSize.h).toFixed(2);
			return ratio < 1 ? 'long' : '';
		} catch (e) {
			return 'wide';
		}
	}

	/**
	 * It returns the markup to be injected in the posts section.
	 */
	async render() {
		const size = await this.getPostSize();
		return `
			<article class="post ${size}">
				${size !== 'wide' ? `<img class="post__img" src="${this.image}" alt="Article featured image">` : ''}
				<div class="post__content">
					<h2 class="post__title">
						<a href="/post/${this.slug()}">
							${this.title}
						</a>
					</h2>
					<p class="post__source">${this.source.render()}</p>
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

	static fromObject2(object) {
		let post = new Post();
		post._id = object._id;
		post.title = object.title;
		post.content = object.content;
		post.image = object.image;
		post.link = object.link;
		post.timestamp = object.timestamp;
		let source = new Source(object.url);
		source.title = object.title;
		post.source = source;
		post.isFavorite = object.isFavorite;
		post.isRead = object.isRead;
		return post;
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
		window.db.post(e.target.textContent.trim()).then(post => {
			post = Post.fromObject2(post);
			let position = Post.getParent(e.target).getBoundingClientRect();
			Modal.from(post, position).init();
		});
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
		let $posts = document.querySelector('.posts');
		if (!posts.length) {
			$posts.innerText = 'Hi! Please add a source of news if you want to see them :)';
			return;
		}
		let reg = new RegExp(/\r\n|\n|\r|\t|\\/, 'gm');
		let promises = posts.map(post => post.render());
		let fragment = Promise.all(promises);
		fragment.then(result => {
			$posts.innerHTML = result.join('').trim().replace(reg, '');
			const postTitles = document.querySelectorAll('.post__title');
			postTitles.forEach(title =>
				title.addEventListener('click', Post.loadPost, false)
			);
		});
	}
}
