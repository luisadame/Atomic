import Modal from './modal';
import {
	debounce
} from '../utils';
import FeedValidator from '../validation/feed';
import Source from '../source';
import Home from '../pages/home';
import CategorySourceModal from './category-add-source';

export default class SourceModal extends Modal {

	getFeedInfo(xml) {
		return new Promise((resolve, reject) => {
			try {
				const dom = new DOMParser().parseFromString(xml, 'text/xml');
				let info = {
					title: dom.querySelector('title').textContent,
					description: dom.querySelector('description').textContent
				};
				resolve(info);
			} catch (error) {
				reject(error);
			}
		});
	}

	proceed() {
		let source = new Source(this.info.url);
		source.title = this.info.title;
		if (source.isUnique()) {
			source.save()
				.then(() => {
					Home.init();
				})
				.catch(() => {
					Home.init();
				});
		}
		this.close();
	}

	validate() {
		let $sourceInput = document.getElementById('source-url');
		let $feedInfo = document.querySelector('.feed-info');
		if ($sourceInput.checkValidity()) {
			this.toggleLoader();
			FeedValidator.validate($sourceInput.value)
				.then(data => {
					let url;
					if (typeof data === 'object') {
						url = data.url;
						data = data.data;
					}
					this.getFeedInfo(data)
						.then(info => {
							this.info = Object.assign({}, info, {
								url: url ? url : $sourceInput.value
							});
							let image = false;
							let markup = `
								${image ? '<div class="image"></div>' : ''}
								<div class="title">${info.title}</div>
								<div class="description">${info.description}</div>
							`;
							$feedInfo.innerHTML = markup;
							$feedInfo.classList.add('show');
							this.toggleLoader();
							this.$ok.removeAttribute('disabled');
						})
						.catch(error => {
							this.toggleLoader();
							throw new Error(error);
						});
				}).catch(error => {
					this.toggleLoader();
					throw new Error(error);
				});

		} else {
			// eslint-disable-next-line no-console
			console.error('Feed not valid');
		}
	}

	open() {
		super.open();
		let $sourceInput = document.getElementById('source-url');
		$sourceInput.addEventListener('input', debounce(this.validate.bind(this), 600));
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
			modal.open();
		}
	}

	static close() {
		Modal.instance.close();
	}
}
