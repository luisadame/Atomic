import Model from './model';
import Modal from './modal';
import Source from './source';
import { distanceInWords } from 'date-fns';

export default class Post extends Model {
	constructor(title = null) {
		super();
		this._database = 'posts';
		this.title = title;
		this.isRead = false;
		this.isFavorite = false;
		this.attributes = ['_id', 'title', 'image', 'timestamp', 'link', 'content', 'source', 'isRead', 'isFavorite'];
	}

	get _id() {
		return this.link;
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

	async isSaved() {
		try {
			// eslint-disable-next-line no-unused-vars
			var doc = await window.db.saved.get(this._id);
			return true;
		} catch (err) {
			return false;
		}
	}

	/**
	 * It creates an sluggified version from the title.
	 */
	slug() {
		return this.title
			.split(' ')
			.map(slice => slice.toLowerCase())
			.join('-')
			.replace(new RegExp(/[^-\w]/, 'g'), '');
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
			<article class="post ${size}" data-id="${this._id}">
				${this.isRead ? '<div class="post__isReadLabel">Read</div>' : ''}
				${size !== 'wide' ? `<img class="post__img" src="${this.image}" alt="Article featured image">` : ''}
				<div class="post__content">
					<h2 class="post__title">
						<a href="/post/${this.slug()}">
							${this.title}
						</a>
					</h2>
					<div class="post__info">
						<p class="post__source" class="notranslate" translate="no">${this.source.render()}</p>&mdash;
						<time class="post__timestamp" datetime="${this.timestamp}">
							${distanceInWords(new Date(), new Date(this.timestamp), {addSuffix: true})}
						</time>
					</div>
				</div>
			</article>
		`;
	}

	/** Check if post is unique in the database */
	isUnique() {
		return window.db[this._database].get(this._id()).then(doc => {
			return !!doc;
		});
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

	static fromObject(object) {
		let post = new Post();
		post.title = object.title;
		post.content = object.content;
		post.image = object.image;
		post.link = object.link;
		post.timestamp = object.timestamp;
		let source = new Source(object.source._url);
		source.title = object.source._title;
		post.source = source;
		post.isFavorite = object.isFavorite ? object.isFavorite : false;
		post.isRead = object.isRead ? object.isRead : false;
		return post;
	}

	static sortByDate(post1, post2, rev = false) {
		return !rev ? new Date(post2.timestamp) - new Date(post1.timestamp) : new Date(post1.timestamp) - new Date(post2.timestamp);
	}

	static all() {
		return window.db.posts.allDocs({
			include_docs: true
		})
			.then(result => {
				let posts = result.rows.filter(row => row.doc.title).map(row => {
					return Post.fromObject(row.doc);
				});
				posts = posts.sort(Post.sortByDate);
				return posts;
			})
			.catch(error => {
				throw new Error(error);
			});
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
		let parent = Post.getParent(e.target);
		let id = parent.dataset.id;
		window.db.postById(id).then(post => {
			post = Post.fromObject(post);
			let position = parent.getBoundingClientRect();
			Modal.from(post, position).init();
		});
	}

	/**
	 * Open a post screen when a slug is passed.
	 * @param {string} slug
	 */
	static openPost(slug) {
		window.db.postBySlug(slug).then(post => {
			let position = {
				width: 0,
				height: 0,
				top: 0,
				left: 0
			};
			post = Post.fromObject(post);
			Modal.from(post, position).init();
		});
	}

	static async render(posts) {
		let $posts = document.querySelector('.posts');
		if (!posts.length) {
			$posts.innerHTML = '<img src="/assets/img/news.svg" alt="No articles or news added" />';
			return;
		}
		let reg = new RegExp(/\r\n|\n|\r|\t|\\/, 'gm');
		let promises = posts.map(post => post.render());
		let result = await Promise.all(promises);
		$posts.innerHTML = result.join('').trim().replace(reg, '');
		const postTitles = document.querySelectorAll('.post__title');
		postTitles.forEach(title =>
			title.addEventListener('click', Post.loadPost, false)
		);
	}
}
