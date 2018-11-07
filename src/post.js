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

	buildModal(rects) {
		this.closing = false;
		return `
			<article class="post--modal" style="top: ${rects.top}px; left: ${
	rects.left
}px; width: ${rects.width}px; height: ${rects.height}px">
				<button class="post--modal__back">Back</button>
				<img class="post__img" src="${this.image}" alt="Article featured image">
				<h2 class="post__title">${this.title}</h2>
				<div class="post__content">${this.content}</div>
				<p class="post__source">${this.source.title}</p>
			</article>
	`;
	}

	destroyModal() {
		this.closing = true;
		let back = document.querySelector('.post--modal .post--modal__back');
		back.removeEventListener('click', this.destroyModal, false);
		document.querySelector('.post--modal').classList.remove('active');
		document.body.classList.remove('modal-opened');
	}

	listenModal() {
		let modal = document.querySelector('.post--modal');
		modal.addEventListener('transitionend', () => {
			if (this.closing) modal.remove();
		});
		let back = document.querySelector('.post--modal .post--modal__back');
		back.addEventListener('click', this.destroyModal.bind(this), false);
	}

	static getParent(e) {
		let parent = e.target.parentElement;
		while (!parent.classList.contains('post')) parent = parent.parentElement;
		return parent;
	}

	static loadPost(e) {
		e.preventDefault();
		let post = db.post(e.target.textContent.trim());
		let parentRect = Post.getParent(e).getBoundingClientRect();
		document.body.insertAdjacentHTML('beforeend', post.buildModal(parentRect));
		post.listenModal();
		document.body.classList.add('modal-opened');
		setTimeout(() => {
			document.querySelector('.post--modal').classList.add('active');
		}, 20);
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
