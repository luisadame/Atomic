import Modal from './modal';
import {
	debounce
} from '../utils';
import FeedValidator from '../validation/feed';
import Source from '../source';
import Home from '../pages/home';
import CategorySourceModal from './category-add-source';
import config from '../config';

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

	proceed() {

		if (window.app.authenticated) {
			let $sourceInput = document.getElementById('source-url');
			let $feedInfo = document.querySelector('.feed-info');
			let url = encodeURIComponent($sourceInput.value);
			fetch(`${config.backend}/feed?url=${url}`, window.app.fetchOptions())
				.then(r => r.json())
				.then(({data}) => {
					let markup = `
							<div class="feed-result" data-url="${data.url}">
								<div class="title">${data.title}</div>
								${data.description ? `<div class="description">${data.description}</div>` : ''}
							</div>
						`;
					$feedInfo.innerHTML = markup;
				})
				.catch(e => console.error);
		} else {
			let source = new Source(this.selectedItem.url);
			source.title = this.selectedItem.title;
			source.description = this.selectedItem.description;

			if (source.isUnique()) {
				source.save()
					.then(Home.init(true))
					.then(this.close());
			}
		}

	}

	// validate() {
	// 	let $sourceInput = document.getElementById('source-url');
	// 	let $feedInfo = document.querySelector('.feed-info');
	// 	if ($sourceInput.checkValidity()) {
	// 		this.toggleLoader();
	// 		FeedValidator.validate($sourceInput.value)
	// 			.then(data => {
	// 				let url;
	// 				if (typeof data === 'object') {
	// 					url = data.url;
	// 					data = data.data;
	// 				}
	// 				this.getFeedInfo(data)
	// 					.then(info => {
	// 						this.info = Object.assign({}, info, {
	// 							url: url ? url : $sourceInput.value
	// 						});
	// 						let image = false;
	// 						let markup = `
	// 							${image ? '<div class="image"></div>' : ''}
	// 							<div class="title">${info.title}</div>
	// 							${info.description ? `<div class="description">${info.description}</div>` : ''}
	// 						`;
	// 						$feedInfo.innerHTML = markup;
	// 						$feedInfo.classList.add('show');
	// 						this.toggleLoader();
	// 						this.$ok.removeAttribute('disabled');
	// 					})
	// 					.catch(error => {
	// 						this.toggleLoader();
	// 						throw new Error(error);
	// 					});
	// 			}).catch(error => {
	// 				this.toggleLoader();
	// 				throw new Error(error);
	// 			});

	// 	} else {
	// 		// eslint-disable-next-line no-console
	// 		console.error('Feed not valid');
	// 	}
	// }

	feedResultMarkup(feed) {
		let $feed = document.createElement('div');
		$feed.className = 'feed-result appear';
		$feed.innerHTML = `
			<div class="title">${feed.title}</div>
			${feed.description ? `<div class="description">${feed.description}</div>` : ''}
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

	addSearchResults(data) {
		let feedResults = document.createDocumentFragment();
		data.forEach(item => {
			let feedResult = this.feedResultMarkup(item);
			feedResult.addEventListener(
				'click',
				this.selectFeedResult.bind(this, item),
				false
			);
			feedResult.addEventListener('animationend', () => {
				feedResult.classList.remove('appear');
			});
			feedResults.appendChild(feedResult);
		});
		this.$feedInfo.innerHTML = '';
		this.$feedInfo.appendChild(feedResults);
		this.$feedInfo.classList.add('show');
	}

	search() {
		this.toggleLoader();
		if (this.$sourceInput.checkValidity()) {
			this.toggleLoader();
			this.$ok.removeAttribute('disabled');
		} else if (this.$sourceInput.value.length > 0) {
			fetch(`${config.backend}/feed/search?url=${this.$sourceInput.value}`)
				.then(r => r.json())
				.then(({data}) => {
					this.search = data;
					this.addSearchResults(data);
					this.toggleLoader();
				})
				.catch(e => console.error);
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
				<header><h2>Add a source</h2></header>
				<div class="container">
					<div class="input-group">
						<label for="source-url">
							Source of news
						</label>
						<div class="flex">
							<input required id="source-url" type="url">
							<div class="loader"></div>
						</div>
					</div>
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
