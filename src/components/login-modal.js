import Modal from './modal';
import config from '../config';
import Form from './Form';
import Auth from '../auth';
import Source from '../source';
import Category from '../category';
import Home from '../pages/home';

export default class SignUpModal extends Modal {

	afterOpen() {
		this.$form = document.getElementById('signup-form');
		this.rules = {
			email: 'required|email',
			password: 'required'
		};
		this.form = new Form(this.$form, this.rules);
	}

	loadSources() {
		this.getContainer().innerHTML = '<p>Getting your sources...</p>';
		return fetch(config.backend + '/sources', window.app.fetchOptions())
			.then(r => r.json());
	}

	saveSources({data}) {
		if (data.length < 1) return;

		let sources = data.map(sourceData => {
			let source = new Source(sourceData.url);
			source.title = sourceData.title;
			if (source.isUnique()) {
				return source.save().then(() => source);
			}
			return undefined;
		}).filter(s => s !== undefined);

		return Promise.all(sources)
			.then(sources => {
				Source.render(sources);
			});
	}

	loadCategories() {
		this.getContainer().innerHTML = '<p>Getting your categories...</p>';
		return fetch(config.backend + '/categories', window.app.fetchOptions())
			.then(r => r.json());
	}

	saveCategories({data}) {
		if (data.length < 1) return;

		let categories = data.map(categoryData => {
			let category = new Category(categoryData.name);
			if (category.isUnique()) {
				return category.save().then(() => category);
			}
			return undefined;
		}).filter(c => c !== undefined);

		return Promise.all(categories)
			.then(categories => {
				Category.render(categories);
			});
	}

	proceed(button) {
		this.toggleLoader();
		button.disabled = true;
		if (this.form.validate()) {
			this.form.removeAllErrorElements();
			this.form.submit()
				.catch(errors => {
					errors = errors.errors ? errors.errors : errors;
					this.form.validator.errors = errors;
					this.form.displayErrors();
					button.disabled = false;
					this.toggleLoader();
				})
				.then(data => {
					Auth.login(data.token)
						.then(this.loadSources.bind(this))
						.then(this.saveSources)
						.then(this.loadCategories.bind(this))
						.then(this.saveCategories)
						.then(this.close)
						.then(() => {
							this.toggleLoader();
							Home.init(true);
						});
				});
		} else {
			this.form.displayErrors();
			button.disabled = false;
		}
	}

	static listen() {
		let $signUpBtn = document.querySelector('.js-login');
		$signUpBtn.addEventListener('click', SignUpModal.toggle);
	}

	static toggle() {
		if (Modal.instance) {
			Modal.instance.close();
		} else {
			SignUpModal.open();
		}
	}

	static open() {
		let markup = `
			<header>
				<h2>Log In</h2>
				<div class="loader"></div>
			</header>
            <div class="container">
                <form id="signup-form" action="${config.backend}/login" method="post">
                    <div class="input-group">
                        <label for="email">
                            Email
                        </label>
                        <div class="flex">
                            <input autofocus required id="email" name="email" type="email">
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="password">
                            Password
                        </label>
                        <div class="flex">
                            <input required id="password" name="password" type="password">
                        </div>
                    </div>
                </form>
			</div>
            <div class="submit">
                <button class="js-ok modal__btn">Log me in!</button>
                <button class="js-cancel modal__btn modal__btn--link">Maybe later...</button>
            </div>
        `;
		let modal = new this(markup);
		modal.classNames('signup__modal');
		modal.open();
	}

	static close() {
		Modal.instance.close();
	}
}
