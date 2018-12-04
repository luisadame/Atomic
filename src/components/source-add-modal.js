import Modal from './modal';
import {
	debounce
} from '../utils';
import FeedValidator from '../validation/feed';
import Source from '../source';

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
		source.save();
		this.close();
	}

	validate() {
		let $sourceInput = document.getElementById('source-url');
		let $feedInfo = document.querySelector('.feed-info');
		if ($sourceInput.checkValidity()) {
			FeedValidator.validate($sourceInput.value)
				.then(data => {
					this.getFeedInfo(data)
						.then(info => {
							this.info = Object.assign({}, info, {
								url: $sourceInput.value
							});
							let markup = `${info.title} - ${info.description}`;
							$feedInfo.innerHTML = markup;
							this.$ok.removeAttribute('disabled');
						})
						.catch(error => {
							throw new Error(error);
						});
				}).catch(error => {
					throw new Error(error);
				});

		} else {
			alert('show errors');
		}
	}

	open() {
		super.open();
		let $sourceInput = document.getElementById('source-url');
		$sourceInput.addEventListener('input', debounce(this.validate.bind(this), 300));
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
		let markup = `
            <header><h2>Add a source</h2></header>
            <div class="container">
                <div class="input-group">
                    <label>
                        Source of news
                    </label>
					<input required id="source-url" type="url">
					<div class="loader"></div>
                </div>
			</div>
			<div class="feed-info"></div>
            <div class="submit">
                <button disabled class="js-ok modal__btn">Add</button>
                <button class="js-cancel modal__btn modal__btn--link">Cancel</button>
            </div>
        `;
		let modal = new this(markup);
		modal.open();
	}

	static close() {
		Modal.instance.close();
	}
}
