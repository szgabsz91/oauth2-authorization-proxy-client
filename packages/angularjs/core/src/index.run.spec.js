import moduleName from './index';

describe('OAuth2AuthorizationProxyCoreRun', () => {
    let $rootScope;
    let $timeout;
    let $state;
    let $stateParams;
    let OAuth2AuthorizationProxyConfiguration;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_$rootScope_, _$timeout_, _$state_, _$stateParams_, _OAuth2AuthorizationProxyConfiguration_) => {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $state = _$state_;
        $stateParams = _$stateParams_;
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;
        sinon.stub($state, 'go');
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('on loggedIn event', () => {
        it('should navigate to the home state if the user is on the login page', () => {
            $state.current.name = OAuth2AuthorizationProxyConfiguration.stateNames.login;
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);
            expect($state.go)
                .to.have.been.calledOnce
                .and.calledWithExactly(OAuth2AuthorizationProxyConfiguration.stateNames.home);
        });

        it('should refresh the current state if the user is not on the login page', () => {
            $state.current.name = 'other';
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedIn);
            $timeout.flush();
            expect($state.go)
                .to.have.been.calledOnce
                .and.calledWithExactly($state.current, $stateParams, {
                    reload: $state.current.name
                });
        });
    });

    describe('on loggedOut event', () => {
        it('should navigate to the login state', () => {
            $rootScope.$emit(OAuth2AuthorizationProxyConfiguration.events.loggedOut);
            $timeout.flush();
            expect($state.go)
                .to.have.been.calledOnce
                .and.calledWithExactly(OAuth2AuthorizationProxyConfiguration.stateNames.login);
        });
    });
});
