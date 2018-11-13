import {expect} from 'chai';
import Modal from '../src/modal';
import Post from '../src/post';
import Source from '../src/source';

let modal;

beforeEach(() => {
    modal = new Modal();
});

test('opened can be set and retrieved', () => {
    modal.opened = true;
    expect(modal.opened).to.be.equal(true);
})

describe('position can be set and retrieved', () => {

    test('position can be set and retrieved', () => {
        document.body.innerHTML = `<div class="post"></div>`;
        let rect = document.body.querySelector('.post').getBoundingClientRect();
        modal.from = rect;
        expect(modal.from).to.be.equals(`top: 0px; left: 0px; width: 0px; height: 0px`);
    });

    test('position fails to be set', () => {
        document.body.innerHTML = `<div class="post"></div>`;
        let rect = document.body.querySelector('.post').getBoundingClientRect();
        delete rect.width;
        expect(() => {modal.from = rect}).to.throw();
    });

    test('post can be set and retrieved', () => {
        const post = new Post('Example');
        modal.setFromPost(post);
        expect(modal.title).to.be.equals('Example');
    });

    test('post fails to be set and retrieved', () => {
        const post = 'Example';
        expect(() => {modal.setFromPost(post)}).to.throw();
    });
});

describe('modal can be redered', () => {
    let post;

    const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
    const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';

    beforeEach(() => {

        Object.defineProperty(global.Image.prototype, 'src', {
            set(src) {
                if (src === LOAD_FAILURE_SRC) {
                    setTimeout(() => this.onerror(new Error('mocked error')));
                } else if (src === LOAD_SUCCESS_SRC) {
                    setTimeout(() => this.onload());
                }
            },
        });

        post = new Post('Example');
        post.content = 'Example content';
        post.source = new Source('http://example.com');
        post.source.title = 'News';
        post.image = LOAD_SUCCESS_SRC;
    });

    test('its gets injected and opened', async () => {

        // Set db mock
        window.db = {
            post: function (title) {
                return post;
            }
        };

        // Set up document
        document.body.innerHTML = `
            <html>
                <head></head>
                <body>
                    <div class="posts"></div>
                </body>
            </html>
        `;

        // Render post to body and save the title
        await Post.render([post]);
        let title = document.body.querySelector('.post__title');

        // Click the title and wait for the modal to be injected
        await title.click();
        await new Promise(resolve => setTimeout(resolve, 25));

        // Check the modal exists in document and classes are correct
        let $modal = document.body.querySelector('.post--modal');
        expect($modal).to.not.be.equal(null);
        expect($modal.classList.contains('active')).to.be.equal(true);
        expect(document.body.classList.contains('modal-opened')).to.be.equal(true);
    });

    test('it gets closed by pressing back button', async () => {
        // Set db mock
        window.db = {
            post: function (title) {
                return post;
            }
        };

        // Set up document
        document.body.innerHTML = `
            <html>
                <head></head>
                <body>
                    <div class="posts"></div>
                </body>
            </html>
        `;

        // Render post to body and save the title
        await Post.render([post]);
        let title = document.body.querySelector('.post__title');

        // Click the title and wait for the modal to be injected
        await title.click();
        await new Promise(resolve => setTimeout(resolve, 25));

        // get the back button
        let backBtn = document.querySelector('.post--modal__back');
        let ev = new Event('transitionend');
        await backBtn.click();
        await new Promise(resolve => setTimeout(resolve, 30));
        let $modal = document.body.querySelector('.post--modal');
        expect($modal.classList.contains('closing')).to.be.equal(true);
        $modal.dispatchEvent(ev);
        await new Promise(resolve => setTimeout(resolve, 30));
        $modal = document.body.querySelector('.post--modal');
        expect($modal).to.be.equal(null);
    });

    test('it does not get removed from dom if is opened', async () => {
        // Set db mock
        window.db = {
            post: function (title) {
                return post;
            }
        };

        // Set up document
        document.body.innerHTML = `
            <html>
                <head></head>
                <body>
                    <div class="posts"></div>
                </body>
            </html>
        `;

        // Render post to body and save the title
        await Post.render([post]);
        let title = document.body.querySelector('.post__title');

        // Click the title and wait for the modal to be injected
        await title.click();
        await new Promise(resolve => setTimeout(resolve, 25));

        // get the back button
        let ev = new Event('transitionend');
        let $modal = document.body.querySelector('.post--modal');
        $modal.dispatchEvent(ev);
        expect($modal.classList.contains('active')).to.be.equal(true);
    });

    test('it gets closed by pressing escape key', async () => {
        // Set db mock
        window.db = {
            post: function (title) {
                return post;
            }
        };

        // Set up document
        document.body.innerHTML = `
            <html>
                <head></head>
                <body>
                    <div class="posts"></div>
                </body>
            </html>
        `;

        // Render post to body and save the title
        await Post.render([post]);
        let title = document.body.querySelector('.post__title');

        // Click the title and wait for the modal to be injected
        await title.click();
        await new Promise(resolve => setTimeout(resolve, 25));

        // Create a keyboard event and fire it
        let $modal = document.body.querySelector('.post--modal');
        let ev = new KeyboardEvent('keypress', {key: 'Escape'});
        $modal.dispatchEvent(ev);

        // Wait for things to run and classes to be added
        await new Promise(resolve => setTimeout(resolve, 30));
        expect($modal.classList.contains('closing')).to.be.equal(true);
        // The modal will ve removed because closing fires a transition end event
    });

    test('it doesnt get closed by pressing other key', async () => {
        // Set db mock
        window.db = {
            post: function (title) {
                return post;
            }
        };

        // Set up document
        document.body.innerHTML = `
            <html>
                <head></head>
                <body>
                    <div class="posts"></div>
                </body>
            </html>
        `;

        // Render post to body and save the title
        await Post.render([post]);
        let title = document.body.querySelector('.post__title');

        // Click the title and wait for the modal to be injected
        await title.click();
        await new Promise(resolve => setTimeout(resolve, 25));

        // Create a keyboard event and fire it
        let $modal = document.body.querySelector('.post--modal');
        let ev = new KeyboardEvent('keypress', {
            key: 'Other key'
        });
        $modal.dispatchEvent(ev);
    });
});
