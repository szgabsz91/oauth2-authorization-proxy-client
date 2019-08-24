import moduleName from '../index';
import { interceptorName as oauth2AuthorizationProxyInterceptorName } from './oauth2-authorization-proxy.interceptor';

describe('OAuth2AuthorizationProxyInterceptor', () => {
    let $http;
    let $httpBackend;
    let OAuth2AuthorizationProxyService;
    let oauth2Provider;
    const accessToken = 'accessToken';

    beforeEach(angular.mock.module(moduleName));

    beforeEach(
        angular.mock.module($httpProvider => {
            $httpProvider.interceptors.push(oauth2AuthorizationProxyInterceptorName);
        })
    );

    beforeEach(inject((_$http_, _$httpBackend_, _OAuth2AuthorizationProxyService_) => {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
        oauth2Provider = {
            id: 'id',
            loginFunction: sinon.spy()
        };
    }));

    afterEach(() => {
        sinon.restore();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should not alter the request if the URL refers to an HTML file', () => {
        const url = 'some.html';
        $httpBackend
            .expect('GET', url, null, headers => {
                return !headers.Authorization && !headers['X-OAuth2-Provider'];
            })
            .respond(200);

        $http.get(url);
        $httpBackend.flush();
    });

    it('should not alter the request if there is no access token', () => {
        sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
        sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(null);

        const url = 'api';
        $httpBackend
            .expect('GET', url, null, headers => {
                return !headers.Authorization && !headers['X-OAuth2-Provider'];
            })
            .respond(200);

        $http.get(url);
        $httpBackend.flush();
    });

    it('should not alter the request if there is no OAuth2 provider', () => {
        sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(null);
        sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);

        const url = 'api';
        $httpBackend
            .expect('GET', url, null, headers => {
                return !headers.Authorization && !headers['X-OAuth2-Provider'];
            })
            .respond(200);

        $http.get(url);
        $httpBackend.flush();
    });

    it('should add the Authorization and X-OAuth2-Provider headers if there is an authenticated user', () => {
        sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
        sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);

        const url = 'api';
        $httpBackend
            .expect('GET', url, null, headers => {
                return (
                    headers.Authorization === `Bearer ${accessToken}` &&
                    headers['X-OAuth2-Provider'] === oauth2Provider.id
                );
            })
            .respond(200);

        $http.get(url);
        $httpBackend.flush();
    });

    it('should invoke OAuth2AuthorizationProxyService.logout if the response status is 401 and there is no access token', () => {
        sinon.stub(OAuth2AuthorizationProxyService, 'logout');

        const url = 'api';
        $httpBackend.expect('GET', url).respond(401);

        $http.get(url).catch(() => {});
        $httpBackend.flush();

        expect(OAuth2AuthorizationProxyService.logout).to.have.been.calledOnce;
    });

    it('should invoke OAuth2AuthorizationProxyService.logout if the response status is 401, there is an access token but no OAuth2 provider', () => {
        sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);
        sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(null);
        sinon.stub(OAuth2AuthorizationProxyService, 'logout');

        const url = 'api';
        $httpBackend.expect('GET', url).respond(401);

        $http.get(url).catch(() => {});
        $httpBackend.flush();

        expect(OAuth2AuthorizationProxyService.logout).to.have.been.calledOnce;
    });

    it('should try to reauthenticate if the response status is 401, there is an access token and an OAuth2 provider after invalidating the old access token', () => {
        sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);
        sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
        sinon.stub(OAuth2AuthorizationProxyService, 'invalidateAccessToken');
        sinon.stub(OAuth2AuthorizationProxyService, 'logout');

        const url = 'api';
        $httpBackend.expect('GET', url).respond(401);

        $http.get(url).catch(() => {});
        $httpBackend.flush();

        expect(oauth2Provider.loginFunction).to.have.been.calledOnce;
        expect(OAuth2AuthorizationProxyService.invalidateAccessToken).to.have.been.calledOnce;
        expect(OAuth2AuthorizationProxyService.logout).to.not.have.been.called;
    });

    it('should not do anything if the response status is not 401', () => {
        sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);
        sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
        sinon.stub(OAuth2AuthorizationProxyService, 'invalidateAccessToken');
        sinon.stub(OAuth2AuthorizationProxyService, 'logout');

        const url = 'api';
        $httpBackend.expect('GET', url).respond(403);

        $http.get(url).catch(() => {});
        $httpBackend.flush();

        expect(oauth2Provider.loginFunction).to.not.have.been.called;
        expect(OAuth2AuthorizationProxyService.invalidateAccessToken).to.not.have.been.called;
        expect(OAuth2AuthorizationProxyService.logout).to.not.have.been.called;
    });
});
