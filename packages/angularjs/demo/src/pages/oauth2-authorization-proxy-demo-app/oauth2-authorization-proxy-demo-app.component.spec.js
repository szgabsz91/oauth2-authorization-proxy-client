import moduleName from '../../index';

describe('oauth2-authorization-proxy-demo-app', () => {
    let scope;
    let component;

    const queryElement = (angularElement, selector) => {
        return angular.element(angularElement[0].querySelector(selector));
    };

    beforeEach(angular.mock.module(moduleName));

    beforeEach(angular.mock.module(($provide) => {
        $provide.value('translateFilter', input => input);
    }));

    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        const element = angular.element('<oauth2-authorization-proxy-demo-app></oauth2-authorization-proxy-demo-app>');
        component = $compile(element)(scope);
        scope.$digest();
    }));

    it('should have a menu button', () => {
        const menuButton = queryElement(component, 'md-toolbar .md-icon-button');
        expect(menuButton.attr('aria-label')).to.equal('OAuth2AuthorizationProxy.Demo.App.Menu.HamburgerIcon.label');

        const menuIcon = queryElement(menuButton, 'md-icon');
        expect(menuIcon.text()).to.equal('menu');
    });

    it('should have a title', () => {
        const titleElement = queryElement(component, 'md-toolbar h1');
        expect(titleElement.text()).to.equal('OAuth2AuthorizationProxy.Demo.App.Title');
    });

    it('should have an oauth2-authorization-proxy-header', () => {
        const headerComponent = queryElement(component, 'md-toolbar oauth2-authorization-proxy-header');
        expect(headerComponent).to.not.be.null;
    });

    it('should have a sidenav', () => {
        const sidenav = queryElement(component, 'md-sidenav');
        expect(sidenav.attr('md-component-id')).to.equal('sidenav');
    });

    it('should have a sidenav title', () => {
        const sidenavToolbar = queryElement(component, 'md-sidenav md-toolbar');
        expect(sidenavToolbar.text().trim()).to.equal('OAuth2AuthorizationProxy.Demo.App.Menu.Title');
    });

    it('should have a home menu item', () => {
        const homeListItem = queryElement(component, 'md-sidenav md-content md-list-item:nth-of-type(1)');

        const anchor = queryElement(homeListItem, 'a');
        expect(anchor.attr('ui-sref')).to.equal('app.home');

        const icon = queryElement(homeListItem, 'md-icon');
        expect(icon.text()).to.equal('home');

        const label = queryElement(homeListItem, 'span');
        expect(label.text()).to.equal('OAuth2AuthorizationProxy.Demo.App.Menu.Home');
    });

    it('should have a login menu item', () => {
        const loginListItem = queryElement(component, 'md-sidenav md-content md-list-item:nth-of-type(2)');

        const anchor = queryElement(loginListItem, 'a');
        expect(anchor.attr('ui-sref')).to.equal('app.login');

        const icon = queryElement(loginListItem, 'md-icon');
        expect(icon.text()).to.equal('account_box');

        const label = queryElement(loginListItem, 'span');
        expect(label.text()).to.equal('OAuth2AuthorizationProxy.Demo.App.Menu.Login');
    });

    it('should have a ui-view component', () => {
        const uiViewComponent = queryElement(component, 'ui-view');
        expect(uiViewComponent).to.not.be.null;
    });
});
