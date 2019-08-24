import moduleName from '../../index';

describe('oauth2-authorization-proxy-facebook-login', () => {
    let $compile;
    let scope;
    let component;

    const queryElement = (angularElement, selector) => {
        return angular.element(angularElement[0].querySelector(selector));
    };

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($rootScope, _$compile_) => {
        scope = $rootScope.$new();
        $compile = _$compile_;
        const element = angular.element('<oauth2-authorization-proxy-facebook-login></oauth2-authorization-proxy-facebook-login>');
        component = $compile(element)(scope);
        scope.$digest();
    }));

    it('should have a login button', () => {
        const loginButton = queryElement(component, 'md-button');
        expect(loginButton.attr('aria-label')).to.equal('OAuth2AuthorizationProxy.Facebook.Logo.label');
    });

    it('should have a logo inside the login button', () => {
        const logo = queryElement(component, 'md-button .oauth2-authorization-proxy-facebook-logo');
        expect(logo.attr('src')).to.be.a.string;
        expect(logo.attr('alt')).to.equal('OAuth2AuthorizationProxy.Facebook.Logo.alt');
    });
});
