import debounce from 'lodash.debounce';

export default function OAuth2AuthorizationProxyCoreRun($injector, $rootScope, $state, OAuth2AuthorizationProxyConfiguration) {
    'ngInject';

    const navigate = debounce(
        (...args) => $state.go(...args),
        OAuth2AuthorizationProxyConfiguration.redirectDebounceTimeInMilliseconds
    );

    $rootScope.$on(OAuth2AuthorizationProxyConfiguration.events.loggedIn, () => {
        if ($state.current.name === OAuth2AuthorizationProxyConfiguration.stateNames.login) {
            $state.go(OAuth2AuthorizationProxyConfiguration.stateNames.home);
        }
        else {
            const stateParams = $injector.get('$stateParams');
            console.log(1);
            navigate($state.current, stateParams, {
                reload: $state.current.name
            });
        }
    });

    $rootScope.$on(OAuth2AuthorizationProxyConfiguration.events.loggedOut, () => {
        console.log('caught');
        if ($state.current.name !== OAuth2AuthorizationProxyConfiguration.stateNames.login) {
            console.log(2);
            navigate(OAuth2AuthorizationProxyConfiguration.stateNames.login);
        }
    });
};
