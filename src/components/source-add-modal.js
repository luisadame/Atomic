import Modal from './modal';
import {
	debounce
} from '../utils';
import FeedValidator from '../validation/feed';

export default class SourceModal extends Modal {

	async getFeedInfo(xml) {
		try {
			const dom = new DOMParser().parseFromString(xml, 'text/xml');
			let info = {
				title: dom.querySelector('title'),
				description: dom.querySelector('description')
			};
			Promise.resolve(info);
		} catch(error) {
			Promise.reject(error);
		}
	}

	proceed() {
		let $sourceInput = document.getElementById('source-url');
		if($sourceInput.checkValidity()) {

			FeedValidator.validate($sourceInput.value)
				.then(data => {
					this.getFeedInfo(data)
						.then()
				})
		} else {
			alert('show errors');
		}
	}

	open() {
		super.open();
		let $sourceInput = document.getElementById('source-url');
		$sourceInput.addEventListener('input', debounce(this.displaySourceInfo, 200));
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
                <button class="js-ok modal__btn">Add</button>
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
