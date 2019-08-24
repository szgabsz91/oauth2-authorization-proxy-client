export const serviceName = 'OAuth2AuthorizationProxyDemoAppHomePageService';

export default function OAuth2AuthorizationProxyDemoAppHomePageService($http) {
    'ngInject';

    return {
        getItems
    };

    function getItems() {
        return $http
            .get('items')
            .then(response => response.data.slice(0, 10))
            .catch(() => []);
    }
}
