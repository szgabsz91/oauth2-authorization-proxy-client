import moduleName from '../../index';

describe('img', () => {
    let $rootScope;
    let $compile;
    let scope;
    let OAuth2AuthorizationProxyService;
    let OAuth2AuthorizationProxyConfiguration;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_$compile_, _$rootScope_, _OAuth2AuthorizationProxyService_, _OAuth2AuthorizationProxyConfiguration_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('on src change', () => {
        it('should leave the src attribute intact if the URL is not protected', () => {
            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            const url = 'src';
            scope.src = url;
            scope.$digest();

            expect(img[0].src).to.equal(`${window.location.origin}/${url}`);
        });

        it('should leave the src attribute intact if there is no authenticated user', () => {
            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            const url = `${window.location.origin}/api/something`;
            scope.src = url;
            scope.$digest();

            expect(img[0].src).to.equal(url);
        });

        it('should leave the src attribute intact if it already contains the access_token and oauth2_provider query parameters', () => {
            const oauth2Provider = {
                id: 'id'
            };
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);

            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            const url = `${window.location.origin}/api/something?access_token=${accessToken}&oauth2_provider=${oauth2Provider.id}`;
            scope.src = url;
            scope.$digest();

            expect(img[0].src).to.equal(url);
        });

        it('should add the access_token and oauth2_provider query parameters if the URL is protected and there is an authenticated user', () => {
            const oauth2Provider = {
                id: 'id'
            };
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);

            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            scope.src = `${window.location.origin}/api/something`;
            scope.$digest();

            expect(img[0].src).to.equal(`${window.location.origin}/api/something?access_token=${accessToken}&oauth2_provider=${oauth2Provider.id}`);
        });
    });

    describe('on loggedIn event', () => {
        it('should leave the src attribute intact if the URL is not protected', () => {
            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            const url = 'src';
            scope.src = url;
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);
            scope.$digest();

            expect(img[0].src).to.equal(`${window.location.origin}/${url}`);
        });

        it('should leave the src attribute intact if there is no authenticated user', () => {
            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            const url = `${window.location.origin}/api/something`;
            scope.src = url;
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);
            scope.$digest();

            expect(img[0].src).to.equal(url);
        });

        it('should leave the src attribute intact if it already contains the access_token and oauth2_provider query parameters', () => {
            const oauth2Provider = {
                id: 'id'
            };
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);

            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            const url = `${window.location.origin}/api/something?access_token=${accessToken}&oauth2_provider=${oauth2Provider.id}`;
            scope.src = url;
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);
            scope.$digest();

            expect(img[0].src).to.equal(url);
        });

        it('should add the access_token and oauth2_provider query parameters if the URL is protected and there is an authenticated user', () => {
            const oauth2Provider = {
                id: 'id'
            };
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyService, 'getCurrentOAuth2Provider').returns(oauth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getAccessToken').returns(accessToken);

            const img = $compile(angular.element('<img ng-src="{{ src }}">'))(scope);
            scope.src = `${window.location.origin}/api/something`;
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);
            scope.$digest();

            expect(img[0].src).to.equal(`${window.location.origin}/api/something?access_token=${accessToken}&oauth2_provider=${oauth2Provider.id}`);
        });
    });
});
