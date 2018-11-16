import 'babel-polyfill';
import '../assets/css/app.scss';
import '../assets/img/logo.svg';

// database
import repository from './repository.js';
import Database from './database';
import Router from './router';
import routes from './router/routes';
import Post from './post';
import Sidebar from './components/sidebar';
import Category from './category';
import config from './config';
const db = new Database(repository);
window.db = db;
window.app = config;
//eslint-disable-next-line no-console
Post.render(db.posts);
Category.render(db.categories);

// we'll split this later
Sidebar.listen();

// Listen url changes
Router.listen(routes);
