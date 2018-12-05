export default class Loader {
	static toggle() {
		let loader = document.getElementById('main-loader');
		if (loader) {
			loader.classList.toggle('loader--show');
		} else {
			Loader.init();
			Loader.toggle();
		}
	}

	static init() {
		if (!document.getElementById('main-loader')) {
			let markup = '<div id="main-loader"><div class="loader">Loading...</div></div>';
			document.body.insertAdjacentHTML('beforeend', markup);
		}
	}
}
