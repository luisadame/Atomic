import Modal from '../modal';
import Sidebar from '../components/sidebar';

export default class Router {

	constructor(routes = []) {
		this.routes = routes;
	}

	get routes() {
		return this._routes;
	}

	set routes(routes) {
		this.validateRoutes(routes);
		this._routes = routes;
	}

	validateRoutes(routes) {
		if (!(routes instanceof Array)) throw new Error('routes parameters must be of an array');

		if (routes.length) {
			const validSchema = route => {
				return route.hasOwnProperty('url') &&
					typeof route.url === 'string' &&
					route.hasOwnProperty('handler') &&
					typeof route.handler === 'function';
			};

			if (!routes.every(validSchema)) throw new Error('Routes have to be an object with url and handler properties');
		}
	}

	/**
	 * Navigate through the page saving the current url,
	 * then change history and title.
	 * @param {string} title
	 * @param {string} url
	 */
	static async go(title, url) {
		// first lets save the current url to localStorage
		localStorage.setItem('previous_url', JSON.stringify(window.location));
		localStorage.setItem('previous_name', document.title);
		// set document title
		document.title = title;
		// then modify history
		window.history.pushState({}, '', url);
	}

	/**
	 * Navigate to the previous url if its different from home.
	 */
	static async back() {
		let previous = JSON.parse(localStorage.getItem('previous_url'));
		if (!previous || previous.hash === '' || previous.href === window.location.href) {
			await Router.go(window.app.name, window.location.href.replace(/#.+/, ''));
		} else {
			await Router.go(localStorage.getItem('previous_name'), previous.href);
		}
	}

	/**
	 * Go to home page.
	 */
	static async home() {
		await Router.go(window.app.name, window.location.href.replace(/#.+/, ''));
	}

	init() {
		localStorage.removeItem('previous_url');
		localStorage.removeItem('previous_name');
		this.addListener();
		this.handleCurrentRoute();
	}

	async handle(e) {
		// get urls hash
		const route = e.target.location.hash.substr(1);

		if (route === '') await Modal.close();

		// hand the hash to the matcher
		this.match(route);

		// Close sidebar if opened
		Sidebar.get().close();
	}

	match(url) {
		this.routes.forEach(route => {
			let pattern = new RegExp(route.url);
			let match = url.match(pattern);
			if (match) {
				route.handler(match[1]);
			}
		});
	}

	handleCurrentRoute() {
		// Get url's hash
		const route = window.location.hash.substr(1);
		// Hand the route to the matcher
		this.match(route);
	}

	addListener() {
		window.addEventListener('popstate', this.handle.bind(this), false);
	}

	static listen(routes) {
		const router = new Router(routes);
		router.init();
		return router;
	}
}
