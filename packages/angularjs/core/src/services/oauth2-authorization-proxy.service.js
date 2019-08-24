export default function OAuth2AuthorizationProxyService(
    $injector,
    $rootScope,
    $q,
    OAuth2AuthorizationProxyCore,
    OAuth2AuthorizationProxyConfiguration,
    oauth2ProviderMap
) {
    'ngInject';

    const service = {
        getOAuth2Providers,
        getOAuth2ProviderById,
        getCurrentOAuth2Provider,
        getPreferredOAuth2Provider,
        getAccessToken,
        getUserInfo,
        login,
        invalidateAccessToken,
        logout
    };
    return service;

    function getOAuth2Providers() {
        return Object.values(oauth2ProviderMap);
    }

    function getOAuth2ProviderById(oauth2ProviderId) {
        return oauth2ProviderMap[oauth2ProviderId];
    }

    function getCurrentOAuth2Provider() {
        const currentOAuth2ProviderId = OAuth2AuthorizationProxyCore.getCurrentOAuth2ProviderId();
        return service.getOAuth2ProviderById(currentOAuth2ProviderId);
    }

    function getPreferredOAuth2Provider() {
        const preferredOAuth2ProviderId = OAuth2AuthorizationProxyCore.getPreferredOAuth2ProviderId();
        return service.getOAuth2ProviderById(preferredOAuth2ProviderId);
    }

    function getAccessToken() {
        return OAuth2AuthorizationProxyCore.getAccessToken();
    }

    function getUserInfo() {
        return OAuth2AuthorizationProxyCore.getUserInfo();
    }

    function login(oauth2ProviderId, accessToken) {
        OAuth2AuthorizationProxyCore.storeData({
            oauth2ProviderId,
            accessToken,
            preferredOAuth2ProviderId: oauth2ProviderId
        });

        const $http = $injector.get('$http');
        $http
            .get(OAuth2AuthorizationProxyConfiguration.urls.userInfo)
            .then(response => response.data)
            .then(userInfo => {
                OAuth2AuthorizationProxyCore.storeData({
                    oauth2ProviderId,
                    accessToken,
                    userInfo,
                    preferredOAuth2ProviderId: oauth2ProviderId
                });
                $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);
            });
    }

    function invalidateAccessToken() {
        OAuth2AuthorizationProxyCore.invalidateAccessToken();
    }

    function logout() {
        const currentOAuth2Provider = service.getCurrentOAuth2Provider();
        service.invalidateAccessToken();
        const logoutPromise = currentOAuth2Provider
            ? $injector.invoke(currentOAuth2Provider.logoutFunction)
            : $q.resolve();
        logoutPromise.then(() => $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedOut));
    }
}
