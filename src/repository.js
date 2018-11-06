import Post from './post';
import Category from './category';
import Source from './source';


let source1 = new Source('https://lifehacker.com/');
source1.title = 'Life Hacker';

let post1 = new Post('How to Stretch If You Hate Stretching');
post1.content = 'Luckily for me, I don’t find physical activity to be a chore. I genuinely enjoy biking, running and playing soccer, and do all of those things on the regular. But when it comes to stretching—well, I just hate it! My mantra is basically, “I’ll stretch when I’m dead.” The appealing part of playing sports and working out…';
post1.source = source1;
post1.image = 'https://i.kinja-img.com/gawker-media/image/upload/s--acGKjLiq--/c_scale,f_auto,fl_progressive,q_80,w_800/qxfzgh10cm4bjnelmoii.jpg';

let category1 = new Category('Exercise');
category1.addSource(source1);

let source2 = new Source('https://theboringcompany.com/');
source2.title = 'The Boring Company';

let post2 = new Post('This is a sample title');
post2.content = 'Luckily for me, I don’t find physical activity to be a chore. I genuinely enjoy biking, running and playing soccer, and do all of those things on the regular. But when it comes to stretching—well, I just hate it! My mantra is basically, “I’ll stretch when I’m dead.” The appealing part of playing sports and working out…';
post2.source = source2;
post2.image = 'http://1.bp.blogspot.com/-hNC-oT6f-fY/TeXxO26yjvI/AAAAAAAAAOY/qfkOqdKkBi8/s1600/platon-photographer-putin-man-of-the-year-portrait.jpg';

export default {
	posts: [
		post1,
		post2,
		post1,
		post1,
		post2,
		post1,
		post1,
		post1,
		post1,
	],
	categories: [
		category1
	],
	sources: [
		source1,
		source2
	]
};
