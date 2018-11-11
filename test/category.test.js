import {expect} from 'chai';
import Category from '../src/category';
import Source from '../src/source';

describe('properties can be set and retrieved correctly', () => {
    let category;

    beforeEach(() => {
        category = new Category('Technology');
    });

    test('instantiation', () => {
        expect(category).to.be.instanceOf(Category);
    });

    test('source can be set', () => {
        const source = new Source('http://example.com')
        category.addSource(source);
        expect(category.sources).to.have.include(source);
    });

    test('sources can be retrieved', () => {
        const source = new Source('http://example.com')
        let sources = [source, source, source];
        sources.forEach(source => category.addSource(source));
        expect(category.sources.length).to.be.equal(sources.length);
    });
});

describe('it can be rendered', () => {

    let category;

    beforeEach(() => {
        category = new Category('Technology');
    });

    test('category can be redered', () => {
        expect(category.render()).to.be.equals('<li>Technology</li>');
    });

    test('categories can be rendered and injected', () => {

        // Create an array with categories
        let categories = ['Technology', 'Politics', 'Music'];
        categories = categories.map(category => new Category(category));

        // Set up document
        document.body.innerHTML = `<div class="categories"></div>`;

        // Render
        Category.render(categories);

        // Assert render was correct
        let expectedMarkup = '<div class="categories"><ul><li>Technology</li><li>Politics</li><li>Music</li></ul></div>';
        expect(document.body.innerHTML.trim()).to.be.equals(expectedMarkup.trim());
    });
})
