import moduleName from './index';

describe('OAuth2AuthorizationProxyDemoAppConfig', () => {
    let OAuth2AuthorizationProxyConfiguration;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_OAuth2AuthorizationProxyConfiguration_) => {
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;
    }));

    it('should configure OAuth2AuthorizationProxyConfiguration', () => {
        expect(OAuth2AuthorizationProxyConfiguration.stateNames.login).to.equal('app.login');
        expect(OAuth2AuthorizationProxyConfiguration.stateNames.home).to.equal('app.home');

        const differentOriginUrl = new URL('/', 'https://google.com');
        expect(OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate(differentOriginUrl)).to.be.false;

        const sameOriginUrlWithHtmlExtension = new URL('/index.html', window.location.origin);
        expect(OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate(sameOriginUrlWithHtmlExtension)).to.be.false;

        const sameOriginUrlWithPngExtension = new URL('/image.png', window.location.origin);
        expect(OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate(sameOriginUrlWithPngExtension)).to.be.true;
    });
});
