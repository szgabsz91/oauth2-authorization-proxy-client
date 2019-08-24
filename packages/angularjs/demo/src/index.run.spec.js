import moduleName from './index';

describe('OAuth2AuthorizationProxyDemoAppRun', () => {
    let $rootScope;
    let $state;
    let OAuth2AuthorizationProxyConfiguration;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_$rootScope_, _$state_, _OAuth2AuthorizationProxyConfiguration_) => {
        $rootScope = _$rootScope_;
        $state = _$state_;
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;
        sinon.stub($state, 'go');
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('on $stateChangeError', () => {
        it('should navigate to the login page', () => {
            $rootScope.$emit('$stateChangeError');
            $rootScope.$emit('$destroy');
            $rootScope.$emit('$stateChangeError');

            expect($state.go)
                .to.have.been.calledOnce
                .and.calledWithExactly(OAuth2AuthorizationProxyConfiguration.stateNames.login);
        });
    });
});
