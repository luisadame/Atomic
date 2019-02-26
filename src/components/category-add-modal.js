import Modal from './modal';
import Category from '../category';
import Form from './Form';

export default class CategoryModal extends Modal {

	afterOpen() {
		this.$form = document.getElementById('category-add-modal');
		this.rules = {
			name: 'required|string'
		};
		this.form = new Form(this.$form, this.rules);
	}

	proceed(button) {
		button.disabled = true;
		this.toggleLoader();
		if (this.form.validate()) {
			let $categoryInput = document.getElementById('category');
			let category = new Category($categoryInput.value);

			let data = new FormData();
			data.set('name', category.name);

			fetch(category.endpoint, {method: 'post', body: data, ...window.app.fetchOptions()})
				.then(r => r.json())
				.then(({data}) => {
					category.id = data.id;
					category.sources = [];
					if (category.isUnique()) {
						return category.save();
					}
				})
				.then(() => {
					return Category.all()
						.then(categories => {
							return Category.render(categories);
						});
				})
				.then(this.close());
		} else {
			this.toggleLoader();
			this.form.displayErrors();
			button.disabled = false;
		}
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
			<header>
				<h2>Add a category</h2>
				<div class="loader"></div>
			</header>
			<div class="container">
				<form id="category-add-modal">
					<div class="input-group">
						<label for="category">
							Category
						</label>
						<div class="flex">
							<input required id="category" type="text" name="name" autocomplete="off">
						</div>
					</div>
				</form>
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
