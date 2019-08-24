import moduleName from '../index';

describe('OAuth2AuthorizationProxyGoogleService', () => {
    let $rootScope;
    let $q;
    let OAuth2AuthorizationProxyGoogleService;
    let OAuth2AuthorizationProxyGoogle;
    let OAuth2AuthorizationProxyService;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((
        _$rootScope_,
        _$q_,
        _OAuth2AuthorizationProxyGoogleService_,
        _OAuth2AuthorizationProxyGoogle_,
        _OAuth2AuthorizationProxyService_
    ) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
        OAuth2AuthorizationProxyGoogleService = _OAuth2AuthorizationProxyGoogleService_;
        OAuth2AuthorizationProxyGoogle = _OAuth2AuthorizationProxyGoogle_;
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('start', () => {
        it('should invoke OAuth2AuthorizationProxyGoogle.loadLibrary with the given options and resolve when the result resolves', done => {
            const options = 'options';

            sinon
                .stub(OAuth2AuthorizationProxyGoogle, 'loadLibrary')
                .withArgs(options)
                .returns($q.when());

            const result = OAuth2AuthorizationProxyGoogleService.start(options);
            result.then(() => done()).catch(() => done(new Error('Promise should have been resolved')));
            $rootScope.$digest();
        });

        it('should invoke OAuth2AuthorizationProxyGoogle.loadLibrary with the given options and reject when the result rejects', done => {
            const options = 'options';

            sinon
                .stub(OAuth2AuthorizationProxyGoogle, 'loadLibrary')
                .withArgs(options)
                .returns($q.reject());

            const result = OAuth2AuthorizationProxyGoogleService.start(options);
            result.then(() => done(new Error('Promise should have been rejected'))).catch(() => done());
            $rootScope.$digest();
        });
    });

    describe('login', () => {
        it('should invoke OAuth2AuthorizationProxyGoogle.login, then OAuth2AuthorizationProxyService.login and resolve if everything is OK', done => {
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyGoogle, 'login').returns(
                $q.when({
                    Zi: {
                        accessToken
                    }
                })
            );
            sinon
                .stub(OAuth2AuthorizationProxyService, 'login')
                .withArgs('Google', accessToken)
                .returns($q.when());

            const result = OAuth2AuthorizationProxyGoogleService.login();
            result.then(() => done()).catch(() => done(new Error('Promise should have been resolved')));
            $rootScope.$digest();
        });

        it('should invoke OAuth2AuthorizationProxyGoogle.login, then OAuth2AuthorizationProxyService.login and reject in case of any errors', done => {
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyGoogle, 'login').returns(
                $q.when({
                    authResponse: {
                        accessToken
                    }
                })
            );
            sinon
                .stub(OAuth2AuthorizationProxyService, 'login')
                .withArgs('Google', accessToken)
                .returns($q.reject());

            const result = OAuth2AuthorizationProxyGoogleService.login();
            result.then(() => done(new Error('Promise should have been rejected'))).catch(() => done());
            $rootScope.$digest();
        });
    });

    describe('logout', () => {
        it('should invoke OAuth2AuthorizationProxyGoogle.logout, then resolve', done => {
            sinon.stub(OAuth2AuthorizationProxyGoogle, 'logout').returns($q.when());
            const result = OAuth2AuthorizationProxyGoogleService.logout();
            result.then(() => done()).catch(() => done(new Error('Promise should have been resolve')));
            $rootScope.$digest();
        });
    });
});
