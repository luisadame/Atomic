import config from '../config';

export default class Feed {

	static async fetch(url) {
		return fetch(url).then(response => response.text());
	}

	static isXML(data) {
		return data.substr(0, 5) === '<?xml';
	}

	static async containsFeedUrl(html) {
		let dom = new DOMParser().parseFromString(html, 'text/html');
		let feed = dom.head.querySelector('link[rel="alternate"]');
		return feed ? Promise.resolve(feed.href) : Promise.reject();
	}

	static mergeURLS(host, feed) {
		if(!feed.includes(host)) {
			return host.replace(/\/$/, '') + '/' + feed.replace(/^\//, '');
		}
		return feed;
	}

	static async validate(url) {
		return this.fetch(config.proxy + url)
			.then(data => {
				if (this.isXML(data)) {
					return data;
				} else {
					return this.containsFeedUrl(data)
						.then(feed => {
							feed = new URL(feed);
							let feedURL = this.mergeURLS(url, feed.pathname);
							return this.fetch(config.proxy + feedURL)
								.then(data => {
									if (this.isXML(data)) {
										return {url: feedURL, data: data};
									} else {
										Promise.reject('The feed type is not compatible.');
									}
								})
								.catch(() => {
									throw new Error('Couldn\'t fetch the feed');
								});
						})
						.catch(() => {
							throw new Error('The feed type is not compatible.');
						});
				}
			})
			.catch(() => {
				throw new Error('Could\'t fetch the feed.');
			});
	}
}
