import moduleName from '../../index';
import { componentName } from './oauth2-authorization-proxy-header.component';

describe('OAuth2AuthorizationProxyHeaderComponentController', () => {
    let controller;
    let $rootScope;
    let $window;
    let OAuth2AuthorizationProxyService;
    let OAuth2AuthorizationProxyConfiguration;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($componentController, _$rootScope_, _$window_, _OAuth2AuthorizationProxyService_, _OAuth2AuthorizationProxyConfiguration_) => {
        $rootScope = _$rootScope_;
        $window = _$window_;
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;

        const locals = {};
        const bindings = {};
        controller = $componentController(componentName, locals, bindings);
    }));

    afterEach(() => {
        sinon.restore();
    });

    it('should initialize all properties to null', () => {
        expect(controller.preferredOAuth2Provider).to.be.null;
        expect(controller.userInfo).to.be.null;
        expect(controller.profilePictureUrl).to.be.null;
        expect(controller.loginStateName).to.be.null;
    });

    describe('$onInit', () => {
        const preferredOAuth2Provider = 'preferredOAuth2Provider';
        const userInfo = {
            profilePictureUrl: 'profilePictureUrl'
        };

        it('should initialize all properties', () => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(preferredOAuth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getUserInfo').returns(userInfo);

            controller.$onInit();

            expect(controller.preferredOAuth2Provider).to.equal(preferredOAuth2Provider);
            expect(controller.userInfo).to.deep.equal(userInfo);
            expect(controller.profilePictureUrl).to.equal(userInfo.profilePictureUrl);
            expect(controller.loginStateName).to.equal(OAuth2AuthorizationProxyConfiguration.stateNames.login);
        });

        it('should set the profilePictureUrl to null if the user is not authenticated', () => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(null);
            sinon.stub(OAuth2AuthorizationProxyService, 'getUserInfo').returns(null);

            controller.$onInit();

            expect(controller.preferredOAuth2Provider).to.be.null;
            expect(controller.userInfo).to.be.null;
            expect(controller.profilePictureUrl).to.be.null
            expect(controller.loginStateName).to.equal(OAuth2AuthorizationProxyConfiguration.stateNames.login);
        });
    });

    describe('loggedIn event listener', () => {
        const preferredOAuth2Provider = 'preferredOAuth2Provider';
        const userInfo = {
            profilePictureUrl: 'profilePictureUrl'
        };

        beforeEach(() => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(preferredOAuth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getUserInfo').returns(userInfo);

            controller.$onInit();
        });

        it('should refresh the preferredOAuth2Provider, userInfo and profilePictureUrl properties', () => {
            const newPreferredOAuth2Provider = 'newPreferredOAuth2Provider';
            const newUserInfo = {
                profilePictureUrl: 'newProfilePictureUrl'
            };

            OAuth2AuthorizationProxyService.getPreferredOAuth2Provider.returns(newPreferredOAuth2Provider);
            OAuth2AuthorizationProxyService.getUserInfo.returns(newUserInfo);

            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);

            expect(controller.preferredOAuth2Provider).to.equal(newPreferredOAuth2Provider);
            expect(controller.userInfo).to.deep.equal(newUserInfo);
            expect(controller.profilePictureUrl).to.equal(newUserInfo.profilePictureUrl);
        });
    });

    describe('loggedOut event listener', () => {
        it('should clear the userInfo and profilePictureUrl properties', () => {
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedOut);

            expect(controller.userInfo).to.be.null;
            expect(controller.profilePictureUrl).to.be.null;
        });
    });

    describe('$onDestroy', () => {
        const preferredOAuth2Provider = 'preferredOAuth2Provider';
        const userInfo = {
            profilePictureUrl: 'profilePictureUrl'
        };

        beforeEach(() => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(preferredOAuth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getUserInfo').returns(userInfo);

            controller.$onInit();
        });

        it('should unsubscribe from the loggedIn event', () => {
            const newPreferredOAuth2Provider = 'newPreferredOAuth2Provider';
            const newUserInfo = {
                profilePictureUrl: 'newProfilePictureUrl'
            };

            OAuth2AuthorizationProxyService.getPreferredOAuth2Provider.returns(newPreferredOAuth2Provider);
            OAuth2AuthorizationProxyService.getUserInfo.returns(newUserInfo);

            controller.$onDestroy();
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);

            expect(controller.preferredOAuth2Provider).to.equal(preferredOAuth2Provider);
            expect(controller.userInfo).to.deep.equal(userInfo);
            expect(controller.profilePictureUrl).to.equal(userInfo.profilePictureUrl);
        });

        it('should unsubscribe from the loggedOut event', () => {
            controller.$onDestroy();
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedOut);

            expect(controller.userInfo).to.deep.equal(userInfo);
            expect(controller.profilePictureUrl).to.equal(userInfo.profilePictureUrl);
        });
    });

    describe('onLoginButtonClicked', () => {
        const preferredOAuth2Provider = 'preferredOAuth2Provider';
        const userInfo = {
            profilePictureUrl: 'profilePictureUrl'
        };

        beforeEach(() => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(preferredOAuth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getUserInfo').returns(userInfo);

            controller.$onInit();
        });

        it('should invoke the login function of the given OAuth2 provider', () => {
            const oauth2Provider = {
                loginFunction: sinon.spy()
            };

            controller.onLoginButtonClicked(oauth2Provider);

            expect(oauth2Provider.loginFunction).to.have.been.calledOnce;
        });
    });

    describe('onViewProfileButtonClicked', () => {
        const preferredOAuth2Provider = 'preferredOAuth2Provider';
        const userInfo = {
            link: 'https://google.com',
            profilePictureUrl: 'profilePictureUrl'
        };

        beforeEach(() => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(preferredOAuth2Provider);
            sinon.stub(OAuth2AuthorizationProxyService, 'getUserInfo').returns(userInfo);

            controller.$onInit();
        });

        it('should open the user\'s profile link in a new window if there is no provided callback', () => {
            sinon.stub($window, 'open');

            controller.onViewProfileButtonClicked();

            expect($window.open)
                .to.have.been.calledOnce
                .and.calledWithExactly(userInfo.link);
        });

        it('should invoke the provided callback if it exists', () => {
            controller.goToProfile = sinon.spy();
            sinon.stub($window, 'open');

            controller.onViewProfileButtonClicked();

            expect($window.open).to.not.have.been.called;
            expect(controller.goToProfile).to.have.been.calledOnce;
        });
    });

    describe('onLogoutButtonClicked', () => {
        it('should invoke OAuth2AuthorizationProxyService.logout', () => {
            sinon.stub(OAuth2AuthorizationProxyService, 'logout');

            controller.onLogoutButtonClicked();

            expect(OAuth2AuthorizationProxyService.logout).to.have.been.calledOnce;
        });
    });
});
