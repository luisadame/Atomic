import config from '../config';

export default class Feed {

    static async fetch(url) {
        return fetch(url).then(response => response.text());
    }

    static isXML(data) {
        return data.substr(0,5) === '<?xml';
    }

    static async containsFeedUrl(html) {
        let dom = new DOMParser().parseFromString(html, 'text/html');
        let feed = dom.head.querySelector('link[rel="alternate"]');
        return feed ? Promise.resolve(feed.href) : Promise.reject();
    }

    static async validate(url) {
        this.fetch(config.proxy + url)
            .then(data => {
                if(this.isXML(data)) {
                    Promise.resolve(data);
                } else {
                    this.containsFeedUrl(data)
                        .then(url => {
                            this.fetch(url)
                                .then(data => {
                                    if(this.isXML(data)) {
                                        Promise.resolve(data);
                                    } else {
                                        Promise.reject("The feed type is not compatible.");
                                    }
                                })
                                .catch(() => {
                                    throw new Error('Couldn\'t fetch the feed');
                                });
                        })
                        .catch(() => {
                            throw new Error('The feed type is not compatible.');
                        })
                }
            })
            .catch(error => {
                throw new Error('Could\'t fetch the feed.');
            })
    }
}
