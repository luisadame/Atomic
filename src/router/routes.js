import Post from '../post';
import Category from '../category';
import Source from '../source';
import Saved from '../pages/saved';
import Favorites from '../pages/favorites';
import Home from '../pages/home';

export default [
	{
		url: '^$',
		handler: Home.init
	},
	{
		url: '^/post/([a-z-]+)$',
		handler: Post.openPost
	},
	{
		url: '^/category/([a-z-]+)$',
		handler: Category.openCategory
	},
	{
		url: '^/source/([a-z-]+)$',
		handler: Source.openSource
	},
	{
		url: '^/favorites',
		handler: Favorites.init
	},
	{
		url: '^/saved',
		handler: Saved.init
	},
	{
		url: '^/example$',
		handler: () => {
		//eslint-disable-next-line
			console.log('example');
		}
	}
];
