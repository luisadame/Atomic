import Auth from './auth';

let handler = {
	set: function (obj, prop, value) {
		obj[prop] = value;
		if (prop === 'authenticated') {
			if (value) {
				Auth.afterLogin();
			} else {
				Auth.afterLogout();
			}
		}
		return true;
	}
};

let config = {
	name: 'Atomic',
	state: 'home',
	backend: 'http://atomic-api.test/api',
	proxy: 'http://atomic-api.test/api/proxy/',
	authenticated: false,
	fetchOptions: () => {
		let access_token = localStorage.getItem('access_token');
		let options = {
			mode: 'cors',
			headers: {
				'Accept': 'application/json, text/plain, */*'
			}
		};
		if (access_token) {
			options.headers['Authorization'] = `Bearer ${access_token}`;
		}
		return options;
	}
};

export default new Proxy(config, handler);
