import Router from '../router';
import Home from '../pages/home';
import Source from '../source';

export default class Sidebar {
	constructor() {
		this.opened = false;
		this.header = document.querySelector('.header');
		this.btn = document.querySelector('.logo');
		this.cloak = document.querySelector('.sidebar__cloak');
		this.title = document.querySelector('.sidebar__header a');
		this.$links = document.querySelectorAll('.sidebar a');

		this.init();
	}

	async init() {
		try {
			let sources = await window.db.sources.allDocs({
				include_docs: true
			});
			sources = sources.rows.filter(row => row.doc.url).map(row => row.doc);
			Source.render(sources.map(Source.fromObject));
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
	}

	toggle(e) {
		e.preventDefault();
		if (!this.opened) {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		this.header.classList.add('sidebar--opened');
		this.btn.blur();
		this.addListeners();
		this.opened = true;
	}

	close() {
		this.header.classList.remove('sidebar--opened');
		this.btn.blur();
		this.removeListeners();
		this.opened = false;
	}

	handleKeys(e) {
		if (e.key === 'Escape' && this.opened) {
			this.close();
		}
	}

	removeListeners() {
		this.cloak.removeEventListener('click', this.close.bind(this));
		window.removeEventListener('keypress', this.handleKeys.bind(this));
	}

	addListeners() {
		this.cloak.addEventListener('click', this.close.bind(this));
		window.addEventListener('keypress', this.handleKeys.bind(this));
	}

	onLogoPressed(e) {
		e.preventDefault();

		if (this.opened) {
			Sidebar.get().close();
		}

		if (window.app.state !== 'home') {
			document.querySelector('.current-section').textContent = 'All articles';
			Router.home();
		}

		Home.init(true);
	}

	static get() {
		return Sidebar._sidebar;
	}

	static listen() {
		const sidebar = new Sidebar();
		Sidebar._sidebar = sidebar;
		sidebar.btn.addEventListener('click', sidebar.toggle.bind(sidebar));
		sidebar.btn.addEventListener('keypress', e => {
			if (e.key === 'Enter') sidebar.toggle.bind(sidebar);
		});
		sidebar.title.addEventListener('click', sidebar.onLogoPressed.bind(sidebar));
		sidebar.$links.forEach(link => {
			link.addEventListener('click', () => {
				Sidebar.get().close();
			});
		});
	}
}
