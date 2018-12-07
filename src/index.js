/**
 * Offline
 */
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', {scope: './'}).then(() => {
		console.log('Sw installed');
	}).catch(err => {
		console.error(err);
	});
}

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

/**
 * Start the router.
 */
Router.listen(routes);
