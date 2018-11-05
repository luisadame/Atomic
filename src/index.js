import '../assets/css/app.scss';

// database
import repository from './repository.js';
import Database from './database';
import Post from './post';
const db = new Database(repository);
//eslint-disable-next-line no-console
Post.render(db.posts);
