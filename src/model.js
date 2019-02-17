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

	async updateLocally() {
		try {
			let doc = await window.db[this._database].get(this._id);
			let updatedObject = {
				_rev: doc._rev,
				...this.toObject()
			};
			return window.db[this._database].put(updatedObject)
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

	async update(updateOnServer = false) {
		if (updateOnServer && window.app.authenticated) {
			let options = {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			};

			return fetch(this.endpoint + `/${this[this.routeKeyName]}`, options)
				.then(r => r.json())
				.then(this.updateLocally());
		} else {
			return this.updateLocally();
		}
	}

	async saveLocally() {
		try {
			return await window.db[this._database].put(this.toObject());
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
	}

	async save(saveOnServer = false) {
		if (saveOnServer && window.app.authenticated) {
			let data = new FormData();

			for (let attribute of this.fillable) {
				data.set(attribute, this[attribute]);
			}

			let options = {
				method: 'POST',
				body: data,
				mode: 'cors',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			};

			return fetch(this.endpoint, options)
				.then(r => r.json())
				.then(this.saveLocally());
		} else {
			return this.saveLocally();
		}
	}

	async deleteLocally() {
		try {
			var doc = await window.db[this._database].get(this._id);
			await window.db[this._database].remove(doc);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}

	async delete(deleteOnServer = false) {
		if (deleteOnServer && window.app.authenticated) {

			let options = {
				method: 'DELETE',
				mode: 'cors',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('access_token')}`
				}
			};

			return fetch(this.endpoint + `/${this[this.routeKeyName]}`, options)
				.then(r => r.json())
				.then(this.deleteLocally());
		} else {
			return this.deleteLocally();
		}
	}
}
