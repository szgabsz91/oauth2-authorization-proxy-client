export const serviceName = 'OAuth2AuthorizationProxyFacebookService';

export default function OAuth2AuthorizationProxyFacebookService(
    $q,
    OAuth2AuthorizationProxyService,
    OAuth2AuthorizationProxyFacebook
) {
    'ngInject';

    return {
        start,
        login,
        logout
    };

    function start(options) {
        return $q((resolve, reject) => {
            OAuth2AuthorizationProxyFacebook.loadLibrary(options)
                .then(resolve)
                .catch(reject);
        });
    }

    function login() {
        return $q((resolve, reject) => {
            OAuth2AuthorizationProxyFacebook.login()
                .then(response => OAuth2AuthorizationProxyService.login('Facebook', response.authResponse.accessToken))
                .then(resolve)
                .catch(reject);
        });
    }

    function logout() {
        return $q(resolve => {
            OAuth2AuthorizationProxyFacebook.logout().then(resolve);
        });
    }
}
