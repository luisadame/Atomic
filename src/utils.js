export const debounce = (fn, time) => {
	let timeout;

	return function () {
		const functionCall = () => fn.apply(this, arguments);

		clearTimeout(timeout);
		timeout = setTimeout(functionCall, time);
	};
};

export const desluggify = slug => {
	let regex = new RegExp('-', 'g');
	return slug.substr(0, 1).toUpperCase() + slug.substr(1).replace(regex, ' ');
};

export const throttle = (fn, limit) => {
	let waiting = false;
	return (...args) => {
		if (!waiting) {
			fn.apply(this, args);
			waiting = true;
			setTimeout(() => {
				waiting = false;
			}, limit);
		}
	};
};
