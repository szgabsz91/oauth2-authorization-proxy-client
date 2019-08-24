export const interceptorName = 'OAuth2AuthorizationProxyInterceptor';

export default function OAuth2AuthorizationProxyInterceptor($injector, $q, OAuth2AuthorizationProxyService) {
    'ngInject';

    return {
        request,
        responseError
    };

    function request(config) {
        if (config.url.endsWith('.html')) {
            return config;
        }

        const currentOAuth2Provider = OAuth2AuthorizationProxyService.getCurrentOAuth2Provider();
        const currentOAuth2ProviderId = currentOAuth2Provider ? currentOAuth2Provider.id : null;
        const accessToken = OAuth2AuthorizationProxyService.getAccessToken();

        if (!currentOAuth2ProviderId || !accessToken) {
            return config;
        }

        return {
            ...config,
            headers: {
                ...config.headers,
                'X-OAuth2-Provider': currentOAuth2ProviderId,
                Authorization: `Bearer ${accessToken}`
            }
        };
    }

    function responseError(rejection) {
        if (rejection.status === 401) {
            const accessToken = OAuth2AuthorizationProxyService.getAccessToken();

            if (accessToken) {
                OAuth2AuthorizationProxyService.invalidateAccessToken();
                const oauth2Provider = OAuth2AuthorizationProxyService.getCurrentOAuth2Provider();

                if (oauth2Provider) {
                    $injector.invoke(oauth2Provider.loginFunction);
                    return $q.reject(rejection);
                }
            }

            OAuth2AuthorizationProxyService.logout();
        }
        return $q.reject(rejection);
    }
}
