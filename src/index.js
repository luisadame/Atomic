import 'babel-polyfill';
import '../assets/css/app.scss';
import '../assets/img/logo.svg';

// database
import repository from './repository.js';
import Database from './database';
import Post from './post';
import Sidebar from './components/sidebar';
import Category from './category';
const db = new Database(repository);
window.db = db;
//eslint-disable-next-line no-console
Post.render(db.posts);
Category.render(db.categories);

// we'll split this later
Sidebar.listen();
