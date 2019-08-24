import logoImageUrl from './assets/google-logo.png';
import { componentName as oauth2AuthorizationProxyGoogleLoginComponentName } from './components/oauth2-authorization-proxy-google-login/oauth2-authorization-proxy-google-login.component';
import { oauth2ProviderId } from './configuration/oauth2-authorization-proxy-google.configuration';

export default function OAuth2AuthorizationProxyGoogleConfig(OAuth2AuthorizationProxyServiceProvider) {
    'ngInject';

    OAuth2AuthorizationProxyServiceProvider.addOAuth2Provider({
        id: oauth2ProviderId,
        componentName: oauth2AuthorizationProxyGoogleLoginComponentName.replace(/([A-Z])/g, v => '-' + v.toLowerCase()),
        loginFunction: function googleLogin(OAuth2AuthorizationProxyGoogleService) {
            'ngInject';
            return OAuth2AuthorizationProxyGoogleService.login();
        },
        logoutFunction: function googleLogout(OAuth2AuthorizationProxyGoogleService) {
            'ngInject';
            return OAuth2AuthorizationProxyGoogleService.logout();
        },
        logoImageUrl,
        priority: 2
    });
}
