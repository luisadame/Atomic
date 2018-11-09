import Database from '../src/database';
import repository from '../src/repository';
import {
	expect
} from 'chai';
import Post from '../src/post';
import Category from '../src/category';
import Source from '../src/source';

let db;
beforeAll(() => {
	db = new Database(repository);
});

describe('Database', () => {
	test('it should retrieve posts', () => {
		db.posts.every(post => expect(post).to.be.instanceof(Post));
	});

	test('it should retrieve categories', () => {
		db.categories.every(category => expect(category).to.be.instanceof(Category));
	});

	test('it should retrieve sources', () => {
		db.sources.every(source => expect(source).to.be.instanceof(Source));
	});

	test('it should search for a post', () => {
		let title = 'How to Stretch If You Hate Stretching';
		let post = db.post(title);
		expect(post).to.be.an.instanceOf(Post);
		expect(post).to.have.property('title').which.is.equals(title);
	});

	test('it should search for a category', () => {
		let name = 'Exercise';
		let category = db.category(name);
		expect(category).to.be.an.instanceOf(Category);
		expect(category).to.have.property('name').which.is.equals(name);
	});
});
