import {expect} from 'chai';
import Source from '../src/source';

describe('properties can be set and retrieved correctly', () => {
    test('it can be instantiated', () => {
        const source = new Source('http://example.com');
        expect(source).to.be.instanceOf(Source);
    });

    test('it fails to be instantiated when wrong url given', () => {
        const source = () => {new Source('adfasdf');};
        expect(source).to.throw('Invalid url given');
    });

    test('url can be retrieved', () => {
        expect(source.url).to.be.equals('http://example.com');
    });

    test('title can be set and retrieved', () => {
        const source = new Source('http://example.com');
        source.title = 'Example';
        expect(source.title).to.be.equals('Example');
    })
});
