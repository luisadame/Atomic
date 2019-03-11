import Modal from './modal';
import Source from '../source';
import Category from '../category';

export default class CategorySourceModal extends Modal {

	async proceed() {
		this.toggleLoader();
		let category = await window.db.category(window.app.category.name);
		category = Category.fromObject(category);
		let sources = category.sources
			.map(source => source.serverId)
			.join(',');
		let data = new FormData();
		data.set('_method', 'PATCH');
		data.set('sources', sources ? sources : null);
		fetch(
			category.endpoint + `/${category[category.routeKeyName]}`,
			{
				method: 'POST',
				body: data,
				...window.app.fetchOptions()
			}
		)
			.then(r => r.json())
			.then(Category.renderCategoryPosts(category.sources))
			.then(() => {
				this.toggleLoader();
				this.close();
			});
	}

	async addSourceToCategory(e) {
		e.preventDefault();
		let source = await window.db.sources.get(e.target.dataset.id);
		let category = await window.db.category(window.app.category.name);
		category = Category.fromObject(category);
		if (!e.target.checked) {
			category.removeSource(source);
		} else {
			category.addSource(source);
		}
	}

	open() {
		super.open();
		let $checkboxes = document.querySelectorAll('.js-source-checkbox');
		$checkboxes.forEach($checkbox => {
			$checkbox.addEventListener('input', this.addSourceToCategory);
		});
	}

	static async open() {
		// get all sources
		let sources = await Source.all();
		window.db.category(window.app.category.name)
			.then(category => {
				category.sources.map(Source.fromObject).forEach(sourceInCategory => {
					let found = sources.findIndex(source => source.url === sourceInCategory.url);
					if (found !== -1) {
						sources[found].included = true;
					}
				});

				let markup = `
					<header>
						<h2>Add sources to this category</h2>
						<div class="loader"></div>
					</header>
                    <div class="container">
                        ${sources.map(source => `
                            <div class="d-flex">
                                <label>
                                    <input type="checkbox" class="js-source-checkbox" data-id="${source._id}" ${source.included ? 'checked' : ''}>
                                    ${source.title}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="submit">
                        <button class="js-ok modal__btn">Add</button>
                        <button class="js-cancel modal__btn modal__btn--link">Cancel</button>
                    </div>
                `;
				let modal = new this(markup);
				modal.open();
			});
	}

	static close() {
		Modal.instance.close();
	}
}
