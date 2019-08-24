import moduleName from '../../index';

describe('OAuth2AuthorizationProxyDemoAppHomePageService', () => {
    let $httpBackend;
    let OAuth2AuthorizationProxyDemoAppHomePageService;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_$httpBackend_, _OAuth2AuthorizationProxyDemoAppHomePageService_) => {
        $httpBackend = _$httpBackend_;
        OAuth2AuthorizationProxyDemoAppHomePageService = _OAuth2AuthorizationProxyDemoAppHomePageService_;
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getItems', () => {
        it('should return the items from the HTTP response if it succeeds', done => {
            const expectedItems = ['Item1', 'Item2'];
            $httpBackend.expect('GET', 'items').respond(200, expectedItems);

            OAuth2AuthorizationProxyDemoAppHomePageService.getItems()
                .then(items => {
                    try {
                        expect(items).to.deep.equal(expectedItems);
                        done();
                    }
                    catch (error) {
                        done(error);
                    }
                })
                .catch(done);
            $httpBackend.flush();
        });

        it('should return an empty list if the HTTP request fails', done => {
            $httpBackend.expect('GET', 'items').respond(401);

            OAuth2AuthorizationProxyDemoAppHomePageService.getItems()
                .then(items => {
                    try {
                        expect(items).to.deep.equal([]);
                        done();
                    }
                    catch (error) {
                        done(error);
                    }
                })
                .catch(done);
            $httpBackend.flush();
        });
    });
});
