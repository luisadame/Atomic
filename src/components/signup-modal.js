import Modal from './modal';
import config from '../config';

export default class SignUpModal extends Modal {

	proceed() {
		let $form = document.getElementById('signup-form');
		$form.checkValidity();
		//this.close();
	}

	static listen() {
		let $signUpBtn = document.querySelector('.js-signup');
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
            <header><h2>Sign Up</h2></header>
            <div class="container">
                <form id="signup-form" action="${config.backend}/signup" method="post">
                    <div class="input-group">
                        <label for="email">
                            Email
                        </label>
                        <div class="flex">
                            <input required id="email" name="email" type="email">
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
                    <div class="input-group">
                        <label for="password">
                            Confirm your password
                        </label>
                        <div class="flex">
                            <input required id="password-confirmation" name="password-confirmation" type="password">
                        </div>
                    </div>
                </form>
			</div>
            <div class="submit">
                <button class="js-ok modal__btn">Sign me up!</button>
                <button class="js-cancel modal__btn modal__btn--link">Maybe later...</button>
            </div>
        `;
		let modal = new this(markup);
		modal.open();
	}

	static close() {
		Modal.instance.close();
	}
}
