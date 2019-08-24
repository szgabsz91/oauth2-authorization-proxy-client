import moduleName from './index';
import { oauth2ProviderId } from './configuration/oauth2-authorization-proxy-facebook.configuration';
import { componentName as oauth2AuthorizationProxyFacebookLoginComponentName } from './components/oauth2-authorization-proxy-facebook-login/oauth2-authorization-proxy-facebook-login.component';
import logoImageUrl from './assets/facebook-logo.png';

describe('OAuth2AuthorizationProxyFacebookConfig', () => {
    let OAuth2AuthorizationProxyService;
    let OAuth2AuthorizationProxyFacebookService;
    let $injector;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_OAuth2AuthorizationProxyService_, _OAuth2AuthorizationProxyFacebookService_, _$injector_) => {
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;
        OAuth2AuthorizationProxyFacebookService = _OAuth2AuthorizationProxyFacebookService_;
        $injector = _$injector_;
    }));

    afterEach(() => {
        sinon.restore();
    });

    it('should register the Facebook OAuth2 provider', () => {
        const oauth2Providers = OAuth2AuthorizationProxyService.getOAuth2Providers();
        const facebookOAuth2Provider = oauth2Providers.find(oauth2Provider => oauth2Provider.id === oauth2ProviderId);
        expect(facebookOAuth2Provider).to.be.an('object');
        expect(facebookOAuth2Provider.componentName).to.equal(oauth2AuthorizationProxyFacebookLoginComponentName.replace(/([A-Z])/g, v => '-' + v.toLowerCase()));
        expect(facebookOAuth2Provider.loginFunction).to.be.an('array');
        expect(facebookOAuth2Provider.logoutFunction).to.be.an('array');
        expect(facebookOAuth2Provider.logoImageUrl).to.equal(logoImageUrl);
        expect(facebookOAuth2Provider.priority).to.equal(1);
    });

    it('should invoke OAuth2AuthorizationProxyFacebookService.login if loginFunction is called', () => {
        const expectedResult = 'expectedResult';
        sinon.stub(OAuth2AuthorizationProxyFacebookService, 'login').returns(expectedResult);

        const oauth2Providers = OAuth2AuthorizationProxyService.getOAuth2Providers();
        const facebookOAuth2Provider = oauth2Providers.find(oauth2Provider => oauth2Provider.id === oauth2ProviderId);
        const result = $injector.invoke(facebookOAuth2Provider.loginFunction);

        expect(result).to.equal(expectedResult);
        expect(OAuth2AuthorizationProxyFacebookService.login).to.have.been.calledOnce;
    });

    it('should invoke OAuth2AuthorizationProxyFacebookService.logout if logoutFunction is called', () => {
        const expectedResult = 'expectedResult';
        sinon.stub(OAuth2AuthorizationProxyFacebookService, 'logout').returns(expectedResult);

        const oauth2Providers = OAuth2AuthorizationProxyService.getOAuth2Providers();
        const facebookOAuth2Provider = oauth2Providers.find(oauth2Provider => oauth2Provider.id === oauth2ProviderId);
        const result = $injector.invoke(facebookOAuth2Provider.logoutFunction);

        expect(result).to.equal(expectedResult);
        expect(OAuth2AuthorizationProxyFacebookService.logout).to.have.been.calledOnce;
    });
});
