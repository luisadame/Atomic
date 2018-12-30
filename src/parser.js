import Post from '../src/post';
import Source from '../src/source';

export default class Parser extends DOMParser {
	constructor(object) {
		super();
		this.data = object.data;
		this.source = object.source;
		this.imageTagPattern = /<img.*src=\\?"(.*.[jpe?g|png|gif|webm])\\?".*\/>/;
		this.dom = this.parseFromString(this.data, 'text/xml');
		this.format = this.getDocumentFormat();
		this.schemas = {
			'rss': {
				title: 'title',
				link: 'link',
				description: 'content',
				content: 'content',
				'content:encoded': 'content',
				pubDate: 'timestamp',
			},
			'atom': {
				title: 'title',
				id: 'link',
				content: 'content',
				'content:encoded': 'content',
				updated: 'timestamp',
			}
		};
	}

	set data(data) {
		this._data = data;
	}

	get data() {
		return this._data;
	}

	getDocumentFormat() {
		return this.dom.documentElement.nodeName === 'feed' ? 'atom' : 'rss';
	}

	strip(html) {
		let doc = this.parseFromString(html, 'text/html');
		return doc.body.textContent || '';
	}

	extractImage(html) {
		let imageURL = html.match(this.imageTagPattern);
		return imageURL ? imageURL[1] : '';
	}

	xmlToJson(dom) {
		let data = {};
		// we need to walk through every node and extract each node content
		const itemsToLookFor = this.schemas[this.format];
		for (let item in itemsToLookFor) {
			let elementData = dom.getElementsByTagName(item)[0];
			elementData = elementData ? elementData.textContent : null;
			if(data[itemsToLookFor[item]] && elementData) {
				data[itemsToLookFor[item]] = elementData;
			} else if (!data[itemsToLookFor[item]]) {
				data[itemsToLookFor[item]] = elementData || null;
			}
		}
		// extract image from description
		let enclosure = dom.getElementsByTagName('enclosure')[0];
		data.image = enclosure ? enclosure.getAttribute('url') : this.extractImage(data.content);
		// and delete it from the description markup
		data.content = data.content.replace(this.imageTagPattern, '');
		// delete analytics tags
		data.content = this.strip(data.content);
		// add source
		data.source = new Source(this.source.url);
		data.source.title = this.source.title;
		// return it
		return data;
	}

	feedInfo() {
		return {
			title: this.dom.querySelector('title'),
			description: this.dom.querySelector('description')
		};
	}

	parsePosts() {
		const posts = this.dom.querySelectorAll('item').length ? this.dom.querySelectorAll('item') : this.dom.querySelectorAll('entry');
		let parsedPosts = [];
		for (let post of posts) {
			parsedPosts.push(Post.fromObject.call(Post, this.xmlToJson(post)));
		}
		return parsedPosts;
	}

	posts() {
		return this.parsePosts();
	}
}
