export default function OAuth2AuthorizationProxyCoreRun($injector, $rootScope, $timeout, $state, OAuth2AuthorizationProxyConfiguration) {
    'ngInject';

    $rootScope.$on(OAuth2AuthorizationProxyConfiguration.events.loggedIn, () => {
        if ($state.current.name === OAuth2AuthorizationProxyConfiguration.stateNames.login) {
            $state.go(OAuth2AuthorizationProxyConfiguration.stateNames.home);
        }
        else {
            const stateParams = $injector.get('$stateParams');
            $timeout(() => $state.go($state.current, stateParams, {
                reload: $state.current.name
            }));
        }
    });

    $rootScope.$on(OAuth2AuthorizationProxyConfiguration.events.loggedOut, () => {
        $timeout(() => $state.go(OAuth2AuthorizationProxyConfiguration.stateNames.login));
    });
};
