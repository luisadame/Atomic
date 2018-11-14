import chai from "chai";
import Router from "../src/router";
import mainRoutes from '../src/router/routes';
import Post from "../src/post";
import Source from '../src/source';

global.jestExpect = global.expect;
global.expect = chai.expect;

describe("properties can be set and retrieved", () => {
    let router;

    beforeEach(() => {
        let routes = [{
            url: "",
            handler: () => {}
        }];
        router = new Router(routes);
    });

    test("routes can be set and retrieved", () => {
        router.routes = [{
            url: "/a/b",
            handler: () => {}
        }];
        expect(router.routes).to.be.instanceOf(Array);
    });

    test("routes fail to be set", () => {
        expect(() => {
            router.routes = "";
        }).to.throw();

        expect(() => {
            router.routes = [1];
        }).to.throw();

        expect(() => {
            router.routes = [{}];
        }).to.throw();

        expect(() => {
            router.routes = [{
                url: 1
            }];
        }).to.throw();

        expect(() => {
            router.routes = [{
                url: "asd",
                handler: ""
            }];
        }).to.throw();
    });
});

describe("it listens to events", () => {
    let routes;
    let post;

    beforeEach(() => {
        routes = [{
            url: "",
            handler: () => {}
        }];

        post = new Post('Example post');
        post.content = 'Example content';
        post.source = new Source('http://example.com');
        post.source.title = 'News';
    });

    test("it listens to popstate event", () => {
        // spy on the router handler
        const spy = jest.spyOn(Router.prototype, 'handle');

        // create router and listen
        Router.listen(routes);

        // mock popstate event and fire it
        let popstate = new Event('popstate');
        window.dispatchEvent(popstate);

        // we expect the spy to be called
        jestExpect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    test("it opens a post by event", async () => {
        // Set db mock
        window.db = {
            postBySlug: function (slug) {
                return post;
            }
        };

        document.body.innerHTML = '<html><head></head><body></body></html>';

        Post.openPost('example-title');
        await new Promise(resolve => setTimeout(resolve, 100));

        let $modal = document.querySelector('.post--modal');
        expect($modal).to.not.be.equals(null);
    });

});
