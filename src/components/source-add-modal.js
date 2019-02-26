import Modal from './modal';
import {
	debounce
} from '../utils';
import Source from '../source';
import Home from '../pages/home';
import CategorySourceModal from './category-add-source';
import config from '../config';
import Form from './Form';

export default class SourceModal extends Modal {

	getFeedInfo(xml) {
		return new Promise((resolve, reject) => {
			try {
				const dom = new DOMParser().parseFromString(xml, 'text/xml');
				let info = {
					title: dom.querySelector('title') ? dom.querySelector('title').textContent : null,
					description: dom.querySelector('description') ? dom.querySelector('description').textContent : null
				};
				resolve(info);
			} catch (error) {
				reject(error);
			}
		});
	}

	afterOpen() {
		this.$form = document.getElementById('source-add-modal');
		this.rules = {
			url: 'required|string'
		};
		this.form = new Form(this.$form, this.rules);
	}

	proceed(button) {
		button.disabled = true;
		this.toggleLoader();
		if (this.form.validate()) {
			if (window.app.authenticated) {
				let data = new FormData();
				Object.keys(this.selectedItem).forEach(key => {
					data.set(key, this.selectedItem[key]);
				});
				fetch(`${config.backend}/sources`, {method: 'POST', body: data, ...window.app.fetchOptions()})
					.then(r => r.json())
					.then(data => {
						let source = new Source(data.url);
						source.title = data.title;

						if (data.description) {
							source.description = data.description;
						}

						data.items = data.items.map(item => {
							item._id = item.url;
							item.source = source.toObject();
							return item;
						});

						if (source.isUnique()) {
							this.toggleLoader();
							source.save()
								.then(window.db.posts.bulkDocs(data.items))
								.then(Home.init(true))
								.then(this.close());
						}
					})
					.catch(e => console.error);
			} else {
				let source = new Source(this.selectedItem.url);
				source.title = this.selectedItem.title;
				source.description = this.selectedItem.description;

				if (source.isUnique()) {
					this.toggleLoader();
					source.save()
						.then(Home.init(true))
						.then(this.close());
				}
			}
		} else {
			this.toggleLoader();
			this.form.displayErrors();
			button.disabled = false;
		}
	}

	feedResultMarkup(feed) {
		let $feed = document.createElement('div');
		$feed.className = 'feed-result appear';
		$feed.innerHTML = `
			<div class="title">${feed.title}</div>
			${feed.description !== 'null' ? `<div class="description">${feed.description}</div>` : ''}
		`;
		return $feed;
	}

	selectFeedResult(item) {
		this.selectedItem = item;
		this.$sourceInput.value = item.url;
		if (this.$sourceInput.checkValidity()) {
			this.$ok.disabled = false;
		}
	}

	createResultElement(item) {
		let feedResult = this.feedResultMarkup(item);
		feedResult.addEventListener(
			'click',
			this.selectFeedResult.bind(this, item),
			false
		);
		feedResult.addEventListener('animationend', () => {
			feedResult.classList.remove('appear');
		});
		return feedResult;
	}

	addSearchResults(data) {
		let feedResults = document.createDocumentFragment();
		data.forEach(item => {
			feedResults.appendChild(this.createResultElement(item));
		});
		this.$feedInfo.innerHTML = '';
		this.$feedInfo.appendChild(feedResults);
		this.$feedInfo.classList.add('show');
	}

	search() {
		if (this.$sourceInput.value.length > 0) {
			this.toggleLoader();
			fetch(`${config.backend}/feed/search?url=${this.$sourceInput.value}`)
				.then(r => r.json())
				.then(({data}) => {
					this.search = data;
					this.addSearchResults(data);
					this.toggleLoader();
				})
				.catch(e => console.error);
		} else {
			this.$feedInfo.classList.remove('show');
		}
	}

	open() {
		super.open();
		this.$sourceInput = document.getElementById('source-url');
		this.$feedInfo = document.querySelector('.feed-info');
		this.$sourceInput.addEventListener('input', debounce(this.search.bind(this), 600));
	}

	toggleLoader() {
		let loader = document.querySelector('#modal .loader');
		loader.classList.toggle('show');
	}

	static listen() {
		let $addBtn = document.querySelector('.js-add-source');
		$addBtn.addEventListener('click', SourceModal.toggle);
	}

	static toggle() {
		if (Modal.instance) {
			Modal.instance.close();
		} else {
			SourceModal.open();
		}
	}

	static open() {
		if (window.app.state === 'category') {
			CategorySourceModal.open();
		} else {
			let markup = `
				<header>
					<h2>Add a source</h2>
					<div class="loader"></div>
				</header>
				<div class="container">
					<form id="source-add-modal">
						<div class="input-group">
							<label for="source-url">
								Source of news
							</label>
							<div class="flex">
								<input required id="source-url" type="url" name="url" autocomplete="off">
								<div class="loader"></div>
							</div>
						</div>
					</form>
					<div class="feed-info"></div>
				</div>
				<div class="submit">
					<button disabled class="js-ok modal__btn">Add</button>
					<button class="js-cancel modal__btn modal__btn--link">Cancel</button>
				</div>
			`;
			let modal = new this(markup);
			modal.classNames('add-source');
			modal.open();
		}
	}

	static close() {
		Modal.instance.close();
	}
}
