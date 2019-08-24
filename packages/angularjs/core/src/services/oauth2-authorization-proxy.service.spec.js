import moduleName from '../index';

describe('OAuth2AuthorizationProxyService', () => {
    let $rootScope;
    let $q;
    let $httpBackend;
    let OAuth2AuthorizationProxyService;
    let OAuth2AuthorizationProxyCore;
    let OAuth2AuthorizationProxyConfiguration;

    const oauth2ProviderMap = {
        provider1: {
            id: 'provider1',
            logoutFunction: sinon.stub()
        },
        provider2: {
            id: 'provider2',
            logoutFunction: sinon.stub()
        }
    };

    beforeEach(angular.mock.module(moduleName));

    beforeEach(
        angular.mock.module(OAuth2AuthorizationProxyServiceProvider => {
            OAuth2AuthorizationProxyServiceProvider.addOAuth2Provider(oauth2ProviderMap.provider1);
            OAuth2AuthorizationProxyServiceProvider.addOAuth2Provider(oauth2ProviderMap.provider2);
        })
    );

    beforeEach(inject((
        _$rootScope_,
        _$q_,
        _$httpBackend_,
        _OAuth2AuthorizationProxyService_,
        _OAuth2AuthorizationProxyCore_,
        _OAuth2AuthorizationProxyConfiguration_
    ) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
        OAuth2AuthorizationProxyCore = _OAuth2AuthorizationProxyCore_;
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;
    }));

    afterEach(() => {
        sinon.restore();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getOAuth2Providers', () => {
        it('should return the OAuth2 providers', () => {
            const result = OAuth2AuthorizationProxyService.getOAuth2Providers();
            expect(result).to.deep.equal(Object.values(oauth2ProviderMap));
        });
    });

    describe('getOAuth2ProviderById', () => {
        it('should return the OAuth2 provider with the given id', () => {
            const id = 'provider1';
            const result = OAuth2AuthorizationProxyService.getOAuth2ProviderById(id);
            expect(result).to.deep.equal(oauth2ProviderMap[id]);
        });
    });

    describe('getCurrentOAuth2Provider', () => {
        it('should return the current OAuth2 provider', () => {
            const id = 'provider1';
            sinon.stub(OAuth2AuthorizationProxyCore, 'getCurrentOAuth2ProviderId').returns(id);
            const result = OAuth2AuthorizationProxyService.getCurrentOAuth2Provider();
            expect(result).to.deep.equal(oauth2ProviderMap[id]);
        });
    });

    describe('getPreferredOAuth2Provider', () => {
        it('should return the preferred OAuth2 provider', () => {
            const id = 'provider1';
            sinon.stub(OAuth2AuthorizationProxyCore, 'getPreferredOAuth2ProviderId').returns(id);
            const result = OAuth2AuthorizationProxyService.getPreferredOAuth2Provider();
            expect(result).to.deep.equal(oauth2ProviderMap[id]);
        });
    });

    describe('getAccessToken', () => {
        it('should return the access token', () => {
            const accessToken = 'accessToken';
            sinon.stub(OAuth2AuthorizationProxyCore, 'getAccessToken').returns(accessToken);
            const result = OAuth2AuthorizationProxyService.getAccessToken();
            expect(result).to.equal(accessToken);
        });
    });

    describe('getUserInfo', () => {
        it('should return the user info', () => {
            const userInfo = 'userInfo';
            sinon.stub(OAuth2AuthorizationProxyCore, 'getUserInfo').returns(userInfo);
            const result = OAuth2AuthorizationProxyService.getUserInfo();
            expect(result).to.equal(userInfo);
        });
    });

    describe('login', () => {
        it('should store the data, request the user info and store it as well', () => {
            const oauth2ProviderId = 'oauth2ProviderId';
            const accessToken = 'accessToken';
            const userInfo = 'userInfo';

            sinon.stub(OAuth2AuthorizationProxyCore, 'storeData');
            $httpBackend.expect('GET', OAuth2AuthorizationProxyConfiguration.urls.userInfo).respond(200, userInfo);
            sinon.stub($rootScope, '$emit');

            OAuth2AuthorizationProxyService.login(oauth2ProviderId, accessToken);
            $httpBackend.flush();

            expect(OAuth2AuthorizationProxyCore.storeData)
                .to.have.been.calledTwice.and.calledWithExactly({
                    oauth2ProviderId,
                    accessToken,
                    preferredOAuth2ProviderId: oauth2ProviderId
                })
                .and.calledWithExactly({
                    oauth2ProviderId,
                    accessToken,
                    userInfo,
                    preferredOAuth2ProviderId: oauth2ProviderId
                });
            expect($rootScope.$emit).to.have.been.calledOnce.and.calledWithExactly(
                OAuth2AuthorizationProxyConfiguration.events.loggedIn
            );
        });
    });

    describe('invalidateAccessToken', () => {
        it('should invalidate the access token', () => {
            sinon.stub(OAuth2AuthorizationProxyCore, 'invalidateAccessToken');
            OAuth2AuthorizationProxyService.invalidateAccessToken();
            expect(OAuth2AuthorizationProxyCore.invalidateAccessToken).to.have.been.calledOnce;
        });
    });

    describe('logout', () => {
        it('should invalidate the access token and emit the logout event if there is no current OAuth2 provider', () => {
            sinon.stub($rootScope, '$emit');
            sinon.stub(OAuth2AuthorizationProxyCore, 'getCurrentOAuth2ProviderId').returns(null);
            sinon.stub(OAuth2AuthorizationProxyCore, 'invalidateAccessToken');

            OAuth2AuthorizationProxyService.logout();
            $rootScope.$digest();

            expect($rootScope.$emit).to.have.been.calledOnce.and.calledWithExactly(
                OAuth2AuthorizationProxyConfiguration.events.loggedOut
            );
            expect(OAuth2AuthorizationProxyCore.invalidateAccessToken).to.have.been.calledOnce;
        });

        it('should invalidate the access token, invoke the logoutFunction of the current OAuth2 provider, and then emit the logout event', () => {
            const oauth2Provider = oauth2ProviderMap.provider1;
            sinon.stub($rootScope, '$emit');
            sinon.stub(OAuth2AuthorizationProxyCore, 'getCurrentOAuth2ProviderId').returns(oauth2Provider.id);
            sinon.stub(OAuth2AuthorizationProxyCore, 'invalidateAccessToken');
            oauth2Provider.logoutFunction.returns($q.when());

            OAuth2AuthorizationProxyService.logout();
            $rootScope.$digest();

            expect(oauth2Provider.logoutFunction).to.have.been.calledOnce;
            expect($rootScope.$emit).to.have.been.calledOnce.and.calledWithExactly(
                OAuth2AuthorizationProxyConfiguration.events.loggedOut
            );
            expect(OAuth2AuthorizationProxyCore.invalidateAccessToken).to.have.been.calledOnce;
        });
    });
});
