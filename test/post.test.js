import Post from '../src/post';
import { expect } from 'chai';
import Source from '../src/source';

test('post can be instantiated correctly', () => {
	const post = new Post('Hello World!');
	expect(post).to.be.instanceOf(Post);
});

describe('post properties can be set and got correctly', () => {
	let post;

	beforeEach(() => {
		post = new Post('Example');
	});

	test('title can be set and retrieved', () => {
		let title = 'Modified';
		post.title = title;
		expect(post.title).to.be.equals(title);
	});

	test('content can be set and retrieved', () => {
		let content = 'This is the content';
		post.content = content;
		expect(post.content).to.be.equals(content);
	});

	test('source can be set and retrieved', () => {
		let source = new Source('http://news.com');
		post.source = source;
		expect(post.source)
			.to.be.an.instanceOf(Source)
			.and.to.be.eql(source);
	});

	test('it only accepts an instance of Source to be set', () => {
		expect(() => {
			post.source = 'asdf';
		}).to.throw();
	});

	test('image can be set and retrieved', () => {
		let image = 'https://example.com/example-image.jpg';
		post.image = image;
		expect(post.image).to.be.equals(image);
	});
});

describe('Get the post size depending on the image set', () => {
	let post;

	beforeAll(() => {
		post = new Post('Example');
	});

	test('it loads an image', () => {
		post.image = 'http://example.com/image.png';
		expect(post.loadImage()).to.have.property('naturalWidth');
	});

	test('it gets an image size', () => {
    post.image = 'http://example.com/image.png';
		expect(post.getImageSize())
			.to.have.property('w')
			.equals(0);
		expect(post.getImageSize())
			.to.have.property('h')
			.equals(0);
	});

	test('it retrieves long post size', () => {
		post.image = 'http://example.com/image.png';

		expect(
			post.getPostSize.call({
				getImageSize: () => {
					return {
						w: 600,
						h: 1200
					};
				}
			})
		).to.equals('long');
	});

	test('it retrieves wide post size', () => {
		post.image = 'http://example.com/image.png';

		expect(
			post.getPostSize.call({
				getImageSize: () => {
					return {
						w: 1200,
						h: 600
					};
				}
			})
		).to.equals('');
	});
});

describe('it renders a post correctly', () => {
	let post;

	beforeEach(() => {
		post = new Post('Example');
		post.content = 'Example content';
		post.source = new Source('http://example.com');
		post.source.title = 'News';
		post.image = 'http://image.com';
	});

	test('it gets the parent "post" element', () => {
    document.body.innerHTML = `
    <html>
      <head></head>
      <body>
        <article class="post">
            <img class="post__img" src="http://example.com/img.jpg" alt="Article featured image">
            <div class="post__content">
              <h2 class="post__title">
                <a href="/post/example-post">
                  Example
                </a>
              </h2>
              <p class="post__source">Example News</p>
            </div>
        </article>
      </body>
    </html>
  `;

		// get the anchor element
		const title = document.querySelector('.post__title');
		// get the post element
		let post = Post.getParent(title);
		expect(post.className).to.be.equals('post');
		expect(post.nodeName).to.be.equals('ARTICLE');
	});

	test('it loads post correctly from db', () => {
		document.body.innerHTML = `
    <html>
      <head></head>
      <body>
        <article class="post">
            <img class="post__img" src="http://example.com/img.jpg" alt="Article featured image">
            <div class="post__content">
              <h2 class="post__title">
                <a href="/post/example-post">
                  Example
                </a>
              </h2>
              <p class="post__source">Example News</p>
            </div>
        </article>
      </body>
    </html>
    `;

    // Mock our db
    window.db = {
      post: function(title) {
        return post;
      }
    };

    // add listener
    let title = document.querySelector('.post__title');
    title.addEventListener('click', Post.loadPost, false);

		// fire click event
    title.click();

		// queue this to the event loop and run after the markup is actually inserted.
    setTimeout(() => {
      const injected = document.body.querySelector('.post--modal');
      expect(injected).to.not.be.equals(null);
    }, 0);
	});

	test('it returns a correct markup to be injected', () => {
		let markup = `
			<article class="post ">
				<img class="post__img" src="http://image.com" alt="Article featured image">
				<div class="post__content">
					<h2 class="post__title">
						<a href="/post/Example">
							Example
						</a>
					</h2>
					<p class="post__source">News</p>
				</div>
			</article>
		`;
		expect(post.render()).to.be.equal(markup);
	});

	test('it renders all posts', () => {

		document.body.innerHTML = `
			<html>
				<head></head>
				<body>
					<div class="posts"></div>
				</body>
			</html>
		`;

		let posts = [post, post, post];
		Post.render(posts);
		setTimeout(() => {
			let postsInDom = document.querySelectorAll('.post');
			expect(postsInDom.length).to.be.equal(posts.length);
		}, 0);
	});
});
