import 'babel-polyfill';
import '../assets/css/app.scss';
import '../assets/img/logo.svg';
import './plugins/fontawesome';

// database
import repository from './repository.js';
import Database from './database';
import Router from './router';
import routes from './router/routes';
import Post from './post';
import Sidebar from './components/sidebar';
import Search from './components/search';
import Category from './category';
import config from './config';
import Source from './source';
import Parser from './parser';
const db = new Database(repository);
window.db = db;
window.app = config;

async function init() {
	let sources;
	try {
		sources = await db.sources.allDocs({
			include_docs: true
		});
		sources = sources.rows.map(row => row.doc);
		Source.render(sources.map(Source.fromObject));
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
		if (!sources.length) {
			Post.render([]);
			return;
		}
	}
	let source = sources[0];
	let data = await fetch(config.proxy + source.url, {
		mode: 'cors',
	});
	data = await data.text();
	let parser = new Parser({
		data: data,
		source: source
	});
	let posts = parser.posts();
	db.posts.bulkDocs(posts.map(post => post.toObject())).then(result => {
		Post.render(posts).catch(e => console.error(e));
	}).catch(e => {
		console.error(e);
	});
}

init();

// Listen url changes
Router.listen(routes);

// we'll split this later
// Category.render(db.categories);
Sidebar.listen();
Search.listen();
