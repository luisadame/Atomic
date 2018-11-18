import {
	debounce
} from '../utils';

export default class Search {

	constructor() {
		this.$search = document.querySelector('.search');
		this.$search__input = this.$search.querySelector('.search__input');
		this.events = [{
			el: this.$search,
			event: 'click',
			handler: this.onClick
		},
		{
			el: this.$search__input,
			event: 'blur',
			handler: this.onBlur
		},
		{
			el: this.$search__input,
			event: 'keyup',
			handler: debounce(this.onKeyUp, 200)
		}
		];
	}

	onClick() {
		this.$search.classList.add('active');
		this.$search__input.focus();
	}

	onBlur() {
		if (this.$search__input.value.length) return;
		this.$search.classList.remove('active');
		this.$search__input.value = '';
	}

	onKeyUp(e) {
		//eslint-disable-next-line
        console.log(e);
	}

	listen() {
		this.events.forEach(ev => ev.el.addEventListener(ev.event, ev.handler.bind(this), false));
	}

	static listen() {
		const search = new Search();
		search.listen();
		return search;
	}
}
