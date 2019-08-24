import moduleName from './index';
import { oauth2ProviderId } from './configuration/oauth2-authorization-proxy-google.configuration';
import { componentName as oauth2AuthorizationProxyGoogleLoginComponentName } from './components/oauth2-authorization-proxy-google-login/oauth2-authorization-proxy-google-login.component';
import logoImageUrl from './assets/google-logo.png';

describe('OAuth2AuthorizationProxyGoogleConfig', () => {
    let OAuth2AuthorizationProxyService;
    let OAuth2AuthorizationProxyGoogleService;
    let $injector;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_OAuth2AuthorizationProxyService_, _OAuth2AuthorizationProxyGoogleService_, _$injector_) => {
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
        OAuth2AuthorizationProxyGoogleService = _OAuth2AuthorizationProxyGoogleService_;
        $injector = _$injector_;
    }));

    afterEach(() => {
        sinon.restore();
    });

    it('should register the Google OAuth2 provider', () => {
        const oauth2Providers = OAuth2AuthorizationProxyService.getOAuth2Providers();
        const googleOAuth2Provider = oauth2Providers.find(oauth2Provider => oauth2Provider.id === oauth2ProviderId);
        expect(googleOAuth2Provider).to.be.an('object');
        expect(googleOAuth2Provider.componentName).to.equal(oauth2AuthorizationProxyGoogleLoginComponentName.replace(/([A-Z])/g, v => '-' + v.toLowerCase()));
        expect(googleOAuth2Provider.loginFunction).to.be.an('array');
        expect(googleOAuth2Provider.logoutFunction).to.be.an('array');
        expect(googleOAuth2Provider.logoImageUrl).to.equal(logoImageUrl);
        expect(googleOAuth2Provider.priority).to.equal(2);
    });

    it('should invoke OAuth2AuthorizationProxyGoogleService.login if loginFunction is called', () => {
        const expectedResult = 'expectedResult';
        sinon.stub(OAuth2AuthorizationProxyGoogleService, 'login').returns(expectedResult);

        const oauth2Providers = OAuth2AuthorizationProxyService.getOAuth2Providers();
        const googleOAuth2Provider = oauth2Providers.find(oauth2Provider => oauth2Provider.id === oauth2ProviderId);
        const result = $injector.invoke(googleOAuth2Provider.loginFunction);

        expect(result).to.equal(expectedResult);
        expect(OAuth2AuthorizationProxyGoogleService.login).to.have.been.calledOnce;
    });

    it('should invoke OAuth2AuthorizationProxyGoogleService.logout if logoutFunction is called', () => {
        const expectedResult = 'expectedResult';
        sinon.stub(OAuth2AuthorizationProxyGoogleService, 'logout').returns(expectedResult);

        const oauth2Providers = OAuth2AuthorizationProxyService.getOAuth2Providers();
        const googleOAuth2Provider = oauth2Providers.find(oauth2Provider => oauth2Provider.id === oauth2ProviderId);
        const result = $injector.invoke(googleOAuth2Provider.logoutFunction);

        expect(result).to.equal(expectedResult);
        expect(OAuth2AuthorizationProxyGoogleService.logout).to.have.been.calledOnce;
    });
});
