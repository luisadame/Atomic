import Modal from './modal';
import Category from '../category';
import Form from './Form';
import Router from '../router';
import Options from './options';

export default class CategoryUpdateModal extends Modal {

	afterOpen() {
		this.$form = document.getElementById('update-category-form');
		this.rules = {
			name: 'required'
		};
		let action = window.app.category.endpoint + `/${window.app.category.name}`;
		this.form = new Form(this.$form, this.rules, action);
	}

	proceed(button) {
		button.disabled = true;
		let category = window.app.category;
		if (this.form.validate()) {
			this.form.submit('PATCH')
				.catch(errors => {
					errors = errors.errors ? errors.errors : errors;
					this.form.validator.errors = errors;
					this.form.displayErrors();
					button.disabled = false;
				})
				.then(data => {
					window.db.categories.get(category._id)
						.then(doc => {
							return window.db.categories.put({
								_id: doc._id,
								_rev: doc._rev,
								name: data.name,
								sources: category.sources
							});
						})
						.then(result => {
							if (result.ok) {
								Router.go(`${data.name} - ${window.app.name}`,`${window.location.origin}/#/category/${data.name}`);
								return Category.openCategory(data.name);
							}
						})
						.then(() => {
							return Category.all()
								.then(categories => {
									return Category.render(categories);
								});
						})
						.then(() => {
							Options.instance.close();
							this.close();
						});
				});
		} else {
			this.form.displayErrors();
			button.disabled = false;
		}
	}

	static listen() {
	}

	static toggle() {
		if (Modal.instance) {
			Modal.instance.close();
		} else {
			CategoryUpdateModal.open();
		}
	}

	static open() {
		let markup = `
            <header><h2>Rename category</h2></header>
			<div class="container">
				<form id="update-category-form">
					<div class="input-group">
						<label for="category">
							New name of this category
						</label>
						<div class="flex">
							<input required id="category" type="text" name="name">
						</div>
                	</div>
				</form>

			</div>
            <div class="submit">
                <button class="js-ok modal__btn">Give it a new name!</button>
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
