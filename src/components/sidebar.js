export default class Sidebar {
	constructor() {
		this.opened = false;
		this.header = document.querySelector('.header');
		this.btn = document.querySelector('.logo');
		this.cloak = document.querySelector('.sidebar__cloak');
	}

	toggle(e) {
		e.preventDefault();
		debugger;
		if (!this.opened) {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		this.header.classList.add('sidebar--opened');
		this.addListeners();
		this.opened = true;
	}

	close() {
		this.header.classList.remove('sidebar--opened');
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

	static listen() {
		const sidebar = new Sidebar();
		sidebar.btn.addEventListener('click', sidebar.toggle.bind(sidebar));
		sidebar.btn.addEventListener('keypress', e => {
			if (e.key === 'Enter') sidebar.toggle.bind(sidebar);
		});
	}
}
