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
const db = new Database(repository);
window.db = db;
window.app = config;

//eslint-disable-next-line no-console
Post.render(db.posts);

// Listen url changes
Router.listen(routes);

// we'll split this later
Category.render(db.categories);
Sidebar.listen();
Search.listen();
