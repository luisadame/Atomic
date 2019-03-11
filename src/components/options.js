import Source from '../source';
import Category from '../category';
import CategoryUpdateModal from './category-update-modal';

export default class Options {

	constructor() {
		this.$options = document.querySelector('.options');
		this.opened = false;
		this.events = [];
	}

	static set markup(html) {
		Options._markup = html;
	}

	static get markup() {
		return Options._markup;
	}

	static get instance() {
		if (Options._instance) {
			return Options._instance;
		} else {
			Options.instance = new Options();
			return Options._instance;
		}
	}

	static set instance(instance) {
		Options._instance = instance;
	}

	static source() {
		let markup = `
            <ul>
                <li>
                    <button class="btn js-delete-source">Delete source</button>
                </li>
            </ul>
        `;
		Options.instance.markup = markup;
	}

	static category() {
		let markup = `
            <ul>
                <li>
					<button class="btn js-delete-category">Delete category</button>
					<button class="btn js-update-category">Rename category</button>
                </li>
            </ul>
        `;
		Options.instance.markup = markup;
	}

	close() {
		this.$options.classList.remove('open');
		this.opened = false;
	}

	open() {
		this.$options.classList.add('open');
		this.opened = true;
	}

	static toggle() {
		if (Options.instance.opened) {
			Options.instance.close();
		} else {
			Options.instance.open();
		}
	}

	static async render() {
		let instance = Options.instance;
		instance.$options.innerHTML = instance.markup;
	}

	static addListeners() {
		let instance = Options.instance;
		instance.events = {
			'source': [
				{
					el: document.querySelector('.js-delete-source'),
					event: 'click',
					handler: Source.delete
				},
			],
			'category': [
				{
					el: document.querySelector('.js-delete-category'),
					event: 'click',
					handler: Category.delete
				},
				{
					el: document.querySelector('.js-update-category'),
					event: 'click',
					handler: CategoryUpdateModal.toggle
				}
			]
		};
		for (let event of instance.events[window.app.state]) {
			event.el.addEventListener(event.event, event.handler);
		}
	}

	static init(e) {
		e.preventDefault();
		switch(window.app.state) {
			case 'source':
				Options.source();
				break;
			case 'category':
				Options.category();
				break;
		}
		Options.render()
			.then(Options.addListeners)
			.then(Options.toggle);
	}

	static listen() {
		let $options = document.querySelector('.js-options');
		$options.addEventListener('click', Options.init.bind(Options));
	}
}
