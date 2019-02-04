export default {
	name: 'Atomic',
	state: 'home',
	proxy: 'http://atomic-api.test/api/proxy/',
	fetchOptions: {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		}
	}
};
