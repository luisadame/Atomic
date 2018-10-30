import '../assets/css/app.scss';

// database
import repository from './repository.js';
import Database from './database';
const db = new Database(repository);
//eslint-disable-next-line no-console
console.log(db);
