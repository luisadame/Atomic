import uuid from 'uuid';

export default class Model {
	constructor() {
		this._id = uuid();
	}
	/**
	 * An object is passed to this function which is going to be called from
	 * a class extending the model, that class should have defined its attributes
	 * so we check that every property in the passed object is defined in their
	 * static attributes. If they do not match, then it's not valid for hydration.
	 * Also, the static attributes defined in the class are an object the keys are
	 * the properties needed and the values are the instance needed.
	 * @param {*} object
	 */
	static fromObject(object) {
		// if (!Object.keys(this.attributes).every(attr => Object.keys(object).includes(attr))) throw new Error('Not valid object for hydration, it is missing important keys.');
		let instance = new this();
		for (let attribute of Object.keys(object)) {
			// If the attribute of the object is an object and doens't match is defined class then we have to hydrate it too.
			// if (typeof object[attribute] === 'object' && !(object[attribute] instanceof this.attributes[attribute])) {
			// 	instance[attribute] = this.attributes[attribute].fromObject(object[attribute]).bind(this.attributes[attribute]);
			// } else {
			instance[attribute] = object[attribute];
			// }
		}
		return instance;
	}

	toObject() {
		let obj = {
			_id: this._id,
		};
		for (let attribute of this.attributes) {
			obj[attribute] = this[attribute];
		}
		return obj;
	}

	async save() {
		try {
			return await window.db[this._database].put(this.toObject());
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
	}
}
