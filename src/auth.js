import Source from './source';
import Category from './category';
import Loader from './components/Loader';
import Post from './post';
import Router from './router';
import SignUpModal from './components/signup-modal';
import LogInModal from './components/login-modal';

export default class Auth {

	static refresh() {
		fetch(
			window.app.backend + '/refresh_token',
			window.app.fetchOptions()
		)
			.then(response => {
				if (response.ok && response.headers['Authorization']) {
					localStorage.setItem('access_token', response.headers['Authorization'].replace('Bearer ', ''));
					window.app.authenticated = true;
				} else {
					this.logout();
				}
			});
	}

	static check() {
		let access_token = localStorage.getItem('access_token');
		if (access_token) {
			// now we need to check the token validity
			fetch(window.app.backend + '/user', window.app.fetchOptions())
				.then(response => {
					if (response.status === 401) {
						this.refresh();
					} else {
						window.app.authenticated = true;
					}
				});
		} else {
			window.app.authenticated = false;
		}
	}

	static login(access_token) {
		localStorage.setItem('access_token', access_token);
		window.app.authenticated = true;
		return Promise.resolve();
	}

	static afterLogin() {
		let userArea = document.querySelector('.sidebar__user-area');
		userArea.innerHTML = '<button class="btn sidebar__user-area__login js-logout">Log Out</button>';
		document.querySelector('.js-logout').addEventListener('click', Auth.logout);
	}

	static afterLogout() {
		let userArea = document.querySelector('.sidebar__user-area');
		userArea.innerHTML = `
			<button class="btn sidebar__user-area__login js-login">Log In</button>
			<button class="btn sidebar__user-area__signup js-signup">Sign Up</button>
		`;
		SignUpModal.listen();
		LogInModal.listen();
	}

	static logout() {
		Loader.toggle();
		localStorage.removeItem('access_token');
		window.db.flush()
			.then(() => {
				window.app.authenticated = false;
				Post.render([]);
				Category.render([]);
				Source.render([]);
				Router.home();
				Loader.toggle();
			});
	}
}
