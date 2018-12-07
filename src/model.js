export default class Model {
	constructor() {
	}

	toObject() {
		let obj = {};
		for (let attribute of this.attributes) {
			obj[attribute] = this[attribute];
		}
		return obj;
	}

	async update() {
		try {
			let doc = await window.db[this._database].get(this._id);
			return await window.db[this._database].put({
				_rev: doc._rev,
				...this.toObject()
			});
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
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
