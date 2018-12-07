import {
	dom,
	library
} from '@fortawesome/fontawesome-svg-core';
import {
	faPlus,
	faSearch,
	faEllipsisV,
	faArrowLeft,
	faHeart,
	faHdd,
	faCheckCircle,
	faStar,
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faSearch, faEllipsisV, faArrowLeft, faHeart, faHdd, faCheckCircle, faStar);

dom.i2svg();
dom.watch();
