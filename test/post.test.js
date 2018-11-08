import Post from '../src/post';

test('post can be created', () => {
	const post = new Post('Hello World!');
	expect(post.title).toBe('Hello World!');
});
