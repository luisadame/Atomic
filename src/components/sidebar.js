import Post from '../post';
import Router from '../router';

export default class Sidebar {
	constructor() {
		this.opened = false;
		this.header = document.querySelector('.header');
		this.btn = document.querySelector('.logo');
		this.cloak = document.querySelector('.sidebar__cloak');
		this.title = document.querySelector('.sidebar__header a');
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
		this.title.addEventListener('click', e => {
			e.preventDefault();
			if (window.app.state !== 'home') {
				Post.all().then(posts => {
					Post.render(posts);
					document.querySelector('.current-section').textContent = 'All articles';
					Sidebar.get().close();
					Router.home();
				});
			}
		});
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
	}
}
