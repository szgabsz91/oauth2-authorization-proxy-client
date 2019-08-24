import moduleName from '../../index';

describe('oauth2-authorization-proxy-demo-app-login-page', () => {
    let component;

    const queryElement = (angularElement, selector) => {
        return angular.element(angularElement[0].querySelector(selector));
    };

    beforeEach(angular.mock.module(moduleName));

    beforeEach(angular.mock.module(($provide) => {
        $provide.value('translateFilter', input => input);
    }));

    beforeEach(inject(($rootScope, $compile) => {
        const scope = $rootScope.$new();
        const element = angular.element('<oauth2-authorization-proxy-demo-app-login-page></oauth2-authorization-proxy-demo-app-login-page>');
        component = $compile(element)(scope);
        scope.$digest();
    }));

    it('should have a title', () => {
        const titleElement = queryElement(component, 'md-card md-card-title md-card-title-text .md-headline');
        expect(titleElement.text()).to.equal('OAuth2AuthorizationProxy.Demo.LoginPage.Title');
    });

    it('should have an oauth2-authorization-proxy-login component', () => {
        const loginComponent = queryElement(component, 'md-card md-card-content oauth2-authorization-proxy-login');
        expect(loginComponent).to.not.be.null;
    });
});
