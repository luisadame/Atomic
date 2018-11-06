export default class Sidebar {
	constructor() {
		this.opened = false;
		this.el = document.querySelector('.sidebar');
		this.btn = document.querySelector('.logo');
		this.toolbar = document.querySelector('.toolbar');
	}

	toggle() {
		this.el.classList.toggle('opened');
		this.btn.classList.toggle('fixed');
		this.toolbar.classList.toggle('opened');
		this.opened = !this.opened;
	}

	static listen() {
		const sidebar = new Sidebar();
		sidebar.btn.addEventListener('click', sidebar.toggle.bind(sidebar));
	}
}
