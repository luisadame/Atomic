import Modal from './modal';
import Category from '../category';

export default class CategoryModal extends Modal {

	proceed() {
		let $categoryInput = document.getElementById('category');
		let category = new Category($categoryInput.value);
		if (category.isUnique()) {
			category.save().then(() => {
				Category.all().then(categories => {
					Category.render(categories);
				});
			});
		}
		this.close();
	}

	static listen() {
		let $add_category = document.querySelector('.js-add-category');
		$add_category.addEventListener('click', CategoryModal.toggle);
	}

	static toggle() {
		if (Modal.instance) {
			Modal.instance.close();
		} else {
			CategoryModal.open();
		}
	}

	static open() {
		let markup = `
            <header><h2>Add a category</h2></header>
            <div class="container">
                <div class="input-group">
                    <label for="category">
                        Category
					</label>
					<div class="flex">
						<input required id="category" type="text">
					</div>
                </div>
			</div>
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
