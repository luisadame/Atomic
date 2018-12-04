import Post from '../src/post';
import Source from '../src/source';

export default class Parser extends DOMParser {
	constructor(object) {
		super();
		this.data = object.data;
		this.source = object.source;
		this.imageTagPattern = /<img.*src=\\?"(.*.[jpe?g|png|gif|webm])\\?".*\/>/;
		//this.analyticsPattern = new RegExp(/on[a-z]+="window\.ga\([^)]+\)"/, 'g');
	}

	set data(data) {
		this._data = data;
	}

	get data() {
		return this._data;
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
		const itemsToLookFor = {
			title: 'title',
			link: 'link',
			description: 'content',
			pubDate: 'timestamp',
		};
		for (let item in itemsToLookFor) {
			data[itemsToLookFor[item]] = dom.querySelector(item).textContent;
		}
		// extract image from description
		data.image = this.extractImage(data.content);
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
		const dom = this.parseFromString(this.data, 'text/xml');
		return {
			title: dom.querySelector('title'),
			description: dom.querySelector('description')
		};
	}

	parsePosts() {
		const dom = this.parseFromString(this.data, 'text/xml');
		const posts = dom.querySelectorAll('item');
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
