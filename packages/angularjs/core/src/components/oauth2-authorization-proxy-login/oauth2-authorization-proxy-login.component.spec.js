import moduleName from '../../index';

describe('oauth2-authorization-proxy-login', () => {
    let $compile;
    let scope;
    let component;
    let OAuth2AuthorizationProxyService;

    const oauth2Providers = [{
        id: 'provider1',
        componentName: 'provider1',
        priority: 2
    }, {
        id: 'provider2',
        componentName: 'provider2',
        priority: 1
    }, {
        id: 'provider3',
        componentName: 'provider3',
        priority: 3
    }];

    const queryElements = (angularElement, selector) => {
        return [...angularElement[0].querySelectorAll(selector)];
    };

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($rootScope, _$compile_, _OAuth2AuthorizationProxyService_) => {
        scope = $rootScope.$new();
        $compile = _$compile_;
        OAuth2AuthorizationProxyService = _OAuth2AuthorizationProxyService_;

        sinon.stub(OAuth2AuthorizationProxyService, 'getOAuth2Providers').returns(oauth2Providers);
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('without a preferred OAuth2 provider', () => {
        beforeEach(() => {
            const element = angular.element('<oauth2-authorization-proxy-login></oauth2-authorization-proxy-login>');
            component = $compile(element)(scope);
            scope.$digest();
        });

        it('should display all the OAuth2 provider components sorted', () => {
            const providerComponents = queryElements(component, '.oauth2-authorization-proxy-login > *');
            const providerComponentNames = providerComponents.map(providerComponent => providerComponent.tagName.toLowerCase());
            expect(providerComponentNames).to.deep.equal(['provider2', 'provider1', 'provider3']);
        });
    });

    describe('with a preferred OAuth2 provider', () => {
        beforeEach(() => {
            sinon.stub(OAuth2AuthorizationProxyService, 'getPreferredOAuth2Provider').returns(oauth2Providers[0]);

            const element = angular.element('<oauth2-authorization-proxy-login></oauth2-authorization-proxy-login>');
            component = $compile(element)(scope);
            scope.$digest();
        });

        it('should display the preferred OAuth2 provider component first, then the others, sorted', () => {
            const providerComponents = queryElements(component, '.oauth2-authorization-proxy-login > *');
            const providerComponentNames = providerComponents.map(providerComponent => providerComponent.tagName.toLowerCase());
            expect(providerComponentNames).to.deep.equal(['provider1', 'provider2', 'provider3']);
        });
    });
});
