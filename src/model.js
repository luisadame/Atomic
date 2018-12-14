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
			let updatedObject = {
				_rev: doc._rev,
				...this.toObject()
			};
			window.db[this._database].put(updatedObject)
				.then(() => {
					if (this._database === 'posts' && this.isSaved()) {
						// we need to sync this with the saved posts
						window.db.saved.put(updatedObject);
					}
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
