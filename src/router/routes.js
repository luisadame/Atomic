import Post from '../post';
import Category from '../category';

export default [{
	url: '^/post/([a-z-]+)$',
	handler: Post.openPost
},
{
	url: '^/category/([a-z-]+)$',
	handler: Category.openCategory
},
{
	url: '^/example$',
	handler: () => {
		//eslint-disable-next-line
			console.log('example');
	}
}
];
