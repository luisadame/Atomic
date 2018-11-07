export default class Sidebar {
	constructor() {
		this.opened = false;
		this.header = document.querySelector('.header');
		this.btn = document.querySelector('.logo');
		this.cloak = document.querySelector('.sidebar__cloak');
	}

	toggle() {
		this.header.classList.toggle('sidebar--opened');
		this.opened = !this.opened;
	}

	static listen() {
		const sidebar = new Sidebar();
		sidebar.btn.addEventListener('click', sidebar.toggle.bind(sidebar));
		sidebar.cloak.addEventListener('click', sidebar.toggle.bind(sidebar));
		window.addEventListener('keypress', key => {
			if (key.key === 'Escape') sidebar.toggle.call(sidebar);
		});
	}
}
