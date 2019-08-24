import logoImageUrl from './assets/facebook-logo.png';
import { componentName as oauth2AuthorizationProxyFacebookLoginComponentName } from './components/oauth2-authorization-proxy-facebook-login/oauth2-authorization-proxy-facebook-login.component';
import { oauth2ProviderId } from './configuration/oauth2-authorization-proxy-facebook.configuration';

export default function OAuth2AuthorizationProxyFacebookConfig(OAuth2AuthorizationProxyServiceProvider) {
    'ngInject';

    OAuth2AuthorizationProxyServiceProvider.addOAuth2Provider({
        id: oauth2ProviderId,
        componentName: oauth2AuthorizationProxyFacebookLoginComponentName.replace(/([A-Z])/g, v => '-' + v.toLowerCase()),
        loginFunction: function facebookLogin(OAuth2AuthorizationProxyFacebookService) {
            'ngInject';
            return OAuth2AuthorizationProxyFacebookService.login();
        },
        logoutFunction: function facebookLogout(OAuth2AuthorizationProxyFacebookService) {
            'ngInject';
            return OAuth2AuthorizationProxyFacebookService.logout();
        },
        logoImageUrl,
        priority: 1
    });
}
