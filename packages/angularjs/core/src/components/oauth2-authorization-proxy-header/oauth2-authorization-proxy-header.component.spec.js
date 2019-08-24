import moduleName from '../../index';

describe('oauth2-authorization-proxy-header', () => {
    let $compile;
    let scope;
    let component;
    let OAuth2AuthorizationProxyService;
    let OAuth2AuthorizationProxyConfiguration;

    const queryElement = (angularElement, selector) => {
        return angular.element(angularElement[0].querySelector(selector));
    };

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($rootScope, _$compile_, _OAuth2AuthorizationProxyService_, _OAuth2AuthorizationProxyConfiguration_) => {
        scope = $rootScope.$new();
        $compile = _$compile_;
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('with user info', () => {
        const userInfo = {
            name: 'name',
            profilePictureUrl: 'profilePictureUrl'
        };

        beforeEach(() => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getUserInfo').returns(userInfo);

            const element = angular.element('<oauth2-authorization-proxy-header></oauth2-authorization-proxy-header>');
            component = $compile(element)(scope);
            scope.$digest();
        });

        it('should display the profile picture', () => {
            const profilePictureElement = queryElement(component, '.user-avatar');
            expect(profilePictureElement.attr('src')).to.equal(userInfo.profilePictureUrl);
            expect(profilePictureElement.attr('alt')).to.equal('OAuth2AuthorizationProxy.Core.Header.ProfilePicture.alt');
        });

        it('should display the user\'s name', () => {
            const name = queryElement(component, '.username').text();
            expect(name).to.equal(userInfo.name);
        });

        it('should display a menu', () => {
            const menuButton = queryElement(component, '.md-icon-button');
            expect(menuButton).to.have.a.lengthOf(1);
        });
    });

    describe('without user info', () => {
        describe('with preferred OAuth2 provider', () => {
            const preferredOAuth2Provider = {
                id: 'Twitter',
                logoImageUrl: 'twitter.png'
            };

            beforeEach(() => {
                sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(preferredOAuth2Provider);

                const element = angular.element('<oauth2-authorization-proxy-header></oauth2-authorization-proxy-header>');
                component = $compile(element)(scope);
                scope.$digest();
            });

            it('should display text about the preferred OAuth2 provider', () => {
                const container = queryElement(component, '.oauth2-authorization-proxy-header--preferred-oauth2-provider');
                const labels = container.text().split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0);
                expect(labels).to.deep.equal([
                    'OAuth2AuthorizationProxy.Core.Header.Login.LoginWith',
                    'OAuth2AuthorizationProxy.Core.Header.Login.Or',
                    'OAuth2AuthorizationProxy.Core.Header.Login.AnotherProvider'
                ]);
            });

            it('should display the logo of the preferred OAuth2 provider', () => {
                const container = queryElement(component, '.oauth2-authorization-proxy-header--preferred-oauth2-provider');
                const logoImage = queryElement(container, 'img');
                expect(logoImage.attr('src')).to.equal(preferredOAuth2Provider.logoImageUrl);
                expect(logoImage.attr('alt')).to.equal(preferredOAuth2Provider.id);
            });

            it('should display the another provider button', () => {
                const container = queryElement(component, '.oauth2-authorization-proxy-header--preferred-oauth2-provider');
                const button = queryElement(container, 'md-button');
                expect(button.attr('ui-sref')).to.equal(OAuth2AuthorizationProxyConfiguration.stateNames.login);
                expect(button.text()).to.equal('OAuth2AuthorizationProxy.Core.Header.Login.AnotherProvider');
            });
        });

        describe('without preferred OAuth2 provider', () => {
            beforeEach(() => {
                const element = angular.element('<oauth2-authorization-proxy-header></oauth2-authorization-proxy-header>');
                component = $compile(element)(scope);
                scope.$digest();
            });

            it('should display a login button if there is no preferred OAuth2 provider', () => {
                const container = queryElement(component, '.oauth2-authorization-proxy-header--no-preferred-oauth2-provider');
                const button = queryElement(container, 'md-button');
                expect(button.attr('ui-sref')).to.equal(OAuth2AuthorizationProxyConfiguration.stateNames.login);
                expect(button.text()).to.equal('OAuth2AuthorizationProxy.Core.Header.Login.Login');
            });
        });
    });
});
