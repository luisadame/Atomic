import {expect} from 'chai';
import Modal from '../src/modal';
import Post from '../src/post';

let modal;

beforeAll(() => {
    modal = new Modal();
});

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
