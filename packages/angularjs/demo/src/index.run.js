export default function OAuth2AuthorizationProxyDemoAppRun($rootScope, $state, OAuth2AuthorizationProxyConfiguration) {
    'ngInject';

    const unsubscribe = $rootScope.$on('$stateChangeError', event => {
        event.preventDefault();
        $state.go(OAuth2AuthorizationProxyConfiguration.stateNames.login);
    });

    $rootScope.$on('$destroy', unsubscribe);
}
