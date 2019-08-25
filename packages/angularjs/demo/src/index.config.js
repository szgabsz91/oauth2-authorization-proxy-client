import { oauth2AuthorizationProxyInterceptorName } from '@szg/oauth2-authorization-proxy-client-angularjs-core';

export default function OAuth2AuthorizationProxyDemoAppConfig($httpProvider, OAuth2AuthorizationProxyConfiguration) {
    'ngInject';

    $httpProvider.interceptors.push(oauth2AuthorizationProxyInterceptorName);

    OAuth2AuthorizationProxyConfiguration.stateNames.login = 'app.login';
    OAuth2AuthorizationProxyConfiguration.stateNames.home = 'app.home';
    OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate = url => url.origin === location.origin && /\/[^/]+\.png/.test(url.pathname);
}
