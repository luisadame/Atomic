export default {
	name: 'Atomic',
	state: 'home',
	backend: 'http://atomic-api.test/api',
	proxy: 'http://atomic-api.test/api/proxy/',
	authenticated: false,
	fetchOptions: {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		}
	}
};
