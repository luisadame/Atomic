/**
 * Static assets.
 */
import 'babel-polyfill';
import '../assets/css/app.scss';
import '../assets/img/logo.svg';
import './plugins/fontawesome';

/**
 * Config and routes.
 */
import config from './config';
import routes from './router/routes';

/**
 * Classes needed.
 */
import Database from './database';
import Router from './router';
import Category from './category';

/**
 * Pages needed.
 */
import Home from './pages/home';

/**
 * Components needed.
 */
import Sidebar from './components/sidebar';
import Search from './components/search';
import SourceModal from './components/source-add-modal';

/**
 * Initialize database and application config.
 */
window.db = new Database();
window.app = config;

/**
 * Execute the process to render all posts.
 */
Home.init();

/**
 * Start the router.
 */
Router.listen(routes);

/**
 * Render the categories saved in the sidebar.
 */
Category.render(window.db.categories);

/**
 * Listen for events related to the sidebar.
 */
Sidebar.listen();

/**
 * Listen for events related with the search component.
 */
Search.listen();

/**
 * Listen for events related with the 'add source' button.
 */
SourceModal.listen();
