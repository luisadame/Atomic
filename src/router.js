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

	init() {
		this.addListener();
		this.handleCurrentRoute();
	}

	handle(e) {
		console.log("HELLOOWWWWW");
		console.log(e);
	}

	match(url) {
		this.routes.forEach(route => {
			if (url.match(route.url)) {
				route.handler(url);
			}
		});
	}

	handleCurrentRoute() {
		// Get url's hash
		const route = window.location.hash.substr(1);
		// If route is home, do nothing.
		if (route === '' || route === '/') return;
		// Otherwise, hand the route to the matcher
		this.match(route);
	}

	addListener() {
		window.addEventListener('popstate', this.handle, false);
	}

	static listen(routes) {
		const router = new Router(routes);
		router.init();
	}
}
