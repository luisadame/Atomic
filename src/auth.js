export default class Auth {
    static login(access_token) {
        localStorage.setItem('access_token', access_token);
        window.app.authenticated = true;
        window.app.fetchOptions['headers']['Authorization'] = `Bearer ${access_token}`;
        // change sidebar
        let userArea = document.querySelector('.sidebar__user-area');
        userArea.innerHTML = '<button class="btn sidebar__user-area__login js-logout">Log Out</button>';
        document.querySelector('.js-logout').addEventListener('click', Auth.logout);
    }

    static logout() {
        localStorage.removeItem('access_token');
        window.app.authenticated = false;
        delete window.app.fetchOptions['headers']['Authorization'];
        window.location.href = '/';
    }
}
