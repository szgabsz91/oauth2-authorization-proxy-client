export const serviceName = 'OAuth2AuthorizationProxyGoogleService';

export default function OAuth2AuthorizationProxyGoogleService(
    $q,
    OAuth2AuthorizationProxyService,
    OAuth2AuthorizationProxyGoogle
) {
    'ngInject';

    return {
        start,
        login,
        logout
    };

    function start(options) {
        return $q((resolve, reject) => {
            OAuth2AuthorizationProxyGoogle.loadLibrary(options)
                .then(resolve)
                .catch(reject);
        });
    }

    function login() {
        return $q((resolve, reject) => {
            OAuth2AuthorizationProxyGoogle.login()
                .then(response => OAuth2AuthorizationProxyService.login('Google', response.Zi.access_token))
                .then(resolve)
                .catch(reject);
        });
    }

    function logout() {
        return $q((resolve, reject) => {
            OAuth2AuthorizationProxyGoogle.logout()
                .then(resolve)
                .catch(reject);
        });
    }
}
