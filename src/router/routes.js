import Post from '../post';

export default [{
	url: '^/post/([a-z-]+)$',
	handler: Post.openPost
},
{
	url: '^/example$',
	handler: () => {
		//eslint-disable-next-line
            console.log('example');
	}
}
];
