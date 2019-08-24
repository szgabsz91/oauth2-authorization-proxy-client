import moduleName from './index';

describe('OAuth2AuthorizationProxyDemoAppMocks', () => {
    let $rootScope;
    let $injector;
    let $state;
    let OAuth2AuthorizationProxyFacebookService;
    let OAuth2AuthorizationProxyGoogleService;
    let OAuth2AuthorizationProxyDemoAppHomePageService;
    let OAuth2AuthorizationProxyDemoAppConfiguration;

    const facebookStartResult = 'facebook';
    const googleStartResult = 'google';
    const itemsResult = 'items';

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_$rootScope_, _$injector_, $q, _$state_, _OAuth2AuthorizationProxyFacebookService_, _OAuth2AuthorizationProxyGoogleService_, _OAuth2AuthorizationProxyDemoAppHomePageService_, _OAuth2AuthorizationProxyDemoAppConfiguration_) => {
        $rootScope = _$rootScope_;
        $injector = _$injector_;
        $state = _$state_;
        OAuth2AuthorizationProxyFacebookService = _OAuth2AuthorizationProxyFacebookService_;
        OAuth2AuthorizationProxyGoogleService = _OAuth2AuthorizationProxyGoogleService_;
        OAuth2AuthorizationProxyDemoAppHomePageService = _OAuth2AuthorizationProxyDemoAppHomePageService_;
        OAuth2AuthorizationProxyDemoAppConfiguration = _OAuth2AuthorizationProxyDemoAppConfiguration_;

        sinon.stub(OAuth2AuthorizationProxyFacebookService, 'start').returns($q.when(facebookStartResult));
        sinon.stub(OAuth2AuthorizationProxyGoogleService, 'start').returns($q.when(googleStartResult));
        sinon.stub(OAuth2AuthorizationProxyDemoAppHomePageService, 'getItems').returns($q.when(itemsResult));
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('resolve.facebook', () => {
        it('should invoke OAuth2AuthorizationProxyFacebookService.start with the appId', () => {
            $state.go('app.login');
            $rootScope.$digest();

            expect(OAuth2AuthorizationProxyFacebookService.start)
                .to.have.been.calledOnce
                .and.calledWithExactly({
                    appId: OAuth2AuthorizationProxyDemoAppConfiguration.facebookAppId
                });

            const result = $injector.invoke($state.current.$$state().parent.resolve.facebook);
            result
                .then(result => {
                    try {
                        expect(result).to.equal(facebookStartResult);
                        done();
                    }
                    catch (error) {
                        done(error);
                    }
                })
                .catch(() => done(new Error('Should have resolved')));
        });
    });

    describe('resolve.google', done => {
        it('should invoke OAuth2AuthorizationProxyGoogleService.start with the clientId', () => {
            $state.go('app.login');
            $rootScope.$digest();

            expect(OAuth2AuthorizationProxyGoogleService.start)
                .to.have.been.calledOnce
                .and.calledWithExactly({
                    clientId: OAuth2AuthorizationProxyDemoAppConfiguration.googleClientId
                });

            const result = $injector.invoke($state.current.$$state().parent.resolve.google);
            result
                .then(result => {
                    try {
                        expect(result).to.equal(googleStartResult);
                        done();
                    }
                    catch (error) {
                        done(error);
                    }
                })
                .catch(() => done(new Error('Should have resolved')));
        });
    });

    describe('items', () => {
        it('should invoke OAuth2AuthorizationProxyDemoAppHomePageService.getItems', () => {
            $state.go('app.home');
            $rootScope.$digest();

            expect(OAuth2AuthorizationProxyDemoAppHomePageService.getItems)
                .to.have.been.calledOnce
                .and.calledWithExactly();

            const result = $injector.invoke($state.current.resolve.items);
            result
                .then(result => {
                    try {
                        expect(result).to.equal(itemsResult);
                        done();
                    }
                    catch (error) {
                        done(error);
                    }
                })
                .catch(() => done(new Error('Should have resolved')));
        });
    });

});
