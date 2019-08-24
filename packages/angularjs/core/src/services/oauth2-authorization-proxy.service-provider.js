import OAuth2AuthorizationProxyService from './oauth2-authorization-proxy.service';

export const providerName = 'OAuth2AuthorizationProxyService';

export default function OAuth2AuthorizationProxyServiceProvider() {
    const oauth2ProviderMap = {};

    this.addOAuth2Provider = oauth2Provider => {
        oauth2ProviderMap[oauth2Provider.id] = oauth2Provider;
    };

    this.$get = $injector => {
        'ngInject';

        return $injector.instantiate(OAuth2AuthorizationProxyService, {
            oauth2ProviderMap
        });
    };
}
