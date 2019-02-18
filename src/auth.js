export default class Auth {
	static check() {
		let access_token = localStorage.getItem('access_token');
		if (access_token) {
			// now we need to check the token validity
			fetch(window.app.backend + '/user', window.app.fetchOptions())
				.then(response => {
					if (response.status === 401) {
						// try to request another token
						fetch(window.app.backend + '/refresh_token', window.app.fetchOptions())
							.then(response => {
								if (response.ok && response.headers['Authorization']) {
									localStorage.setItem('access_token', response.headers['Authorization'].replace('Bearer ', ''));
									window.app.authenticated = true;
								} else {
									this.logout();
								}
							});
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
	}

	static logout() {
		localStorage.removeItem('access_token');
		window.app.authenticated = false;
		window.location.href = '/';
	}
}
