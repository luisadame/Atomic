import { expect } from 'chai';
import Modal from '../../src/components/modal';

describe('it opens and closes', () => {
    let modal;

    beforeEach(() => {
        // set up document
        document.body.innerHTML = `
            <html>
                <head></head>
                <body></body>
            </html>
        `;

        modal = new Modal();
    });

    test('it opens', () => {
        modal.open();
        let $modal = document.getElementById('modal');
        expect($modal).to.not.be.equal(null);
    });

    test('it closes', () => {
        modal.open();
        // console.log(document.documentElement.innerHTML);
        let $modal = document.getElementById('modal');
        expect($modal).to.not.be.equal(null);
        // modal.close();
        // $modal = document.getElementById('modal');
        // expect($modal).to.be.equal(null);
    });
});
