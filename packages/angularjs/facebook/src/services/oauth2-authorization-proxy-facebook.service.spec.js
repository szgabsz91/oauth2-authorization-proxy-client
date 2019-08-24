import moduleName from '../index';

describe('OAuth2AuthorizationProxyFacebookService', () => {
    let $rootScope;
    let $q;
    let OAuth2AuthorizationProxyFacebookService;
    let OAuth2AuthorizationProxyFacebook;
    let OAuth2AuthorizationProxyService;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((
        _$rootScope_,
        _$q_,
        _OAuth2AuthorizationProxyFacebookService_,
        _OAuth2AuthorizationProxyFacebook_,
        _OAuth2AuthorizationProxyService_
    ) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
        OAuth2AuthorizationProxyFacebookService = _OAuth2AuthorizationProxyFacebookService_;
        OAuth2AuthorizationProxyFacebook = _OAuth2AuthorizationProxyFacebook_;
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('start', () => {
        it('should invoke OAuth2AuthorizationProxyFacebook.loadLibrary with the given options and resolve when the result resolves', done => {
            const options = 'options';

            sinon
                .stub(OAuth2AuthorizationProxyFacebook, 'loadLibrary')
                .withArgs(options)
                .returns($q.when());

            const result = OAuth2AuthorizationProxyFacebookService.start(options);
            result.then(() => done()).catch(() => done(new Error('Promise should have been resolved')));
            $rootScope.$digest();
        });

        it('should invoke OAuth2AuthorizationProxyFacebook.loadLibrary with the given options and reject when the result rejects', done => {
            const options = 'options';

            sinon
                .stub(OAuth2AuthorizationProxyFacebook, 'loadLibrary')
                .withArgs(options)
                .returns($q.reject());

            const result = OAuth2AuthorizationProxyFacebookService.start(options);
            result.then(() => done(new Error('Promise should have been rejected'))).catch(() => done());
            $rootScope.$digest();
        });
    });

    describe('login', () => {
        it('should invoke OAuth2AuthorizationProxyFacebook.login, then OAuth2AuthorizationProxyService.login and resolve if everything is OK', done => {
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyFacebook, 'login').returns(
                $q.when({
                    authResponse: {
                        accessToken
                    }
                })
            );
            sinon
                .stub(OAuth2AuthorizationProxyService, 'login')
                .withArgs('Facebook', accessToken)
                .returns($q.when());

            const result = OAuth2AuthorizationProxyFacebookService.login();
            result.then(() => done()).catch(() => done(new Error('Promise should have been resolved')));
            $rootScope.$digest();
        });

        it('should invoke OAuth2AuthorizationProxyFacebook.login, then OAuth2AuthorizationProxyService.login and reject in case of any errors', done => {
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyFacebook, 'login').returns(
                $q.when({
                    authResponse: {
                        accessToken
                    }
                })
            );
            sinon
                .stub(OAuth2AuthorizationProxyService, 'login')
                .withArgs('Facebook', accessToken)
                .returns($q.reject());

            const result = OAuth2AuthorizationProxyFacebookService.login();
            result.then(() => done(new Error('Promise should have been rejected'))).catch(() => done());
            $rootScope.$digest();
        });
    });

    describe('logout', () => {
        it('should invoke OAuth2AuthorizationProxyFacebook.logout, then resolve', done => {
            sinon.stub(OAuth2AuthorizationProxyFacebook, 'logout').returns($q.when());
            const result = OAuth2AuthorizationProxyFacebookService.logout();
            result.then(() => done()).catch(() => done(new Error('Promise should have been resolve')));
            $rootScope.$digest();
        });
    });
});
