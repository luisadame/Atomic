import Post from '../post';
import Category from '../category';
import Source from '../source';

export default [{
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
	url: '^/example$',
	handler: () => {
		//eslint-disable-next-line
			console.log('example');
	}
}
];
