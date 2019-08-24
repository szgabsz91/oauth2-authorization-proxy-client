import moduleName from '../../index';

describe('oauth2-authorization-proxy-demo-app-home-page', () => {
    let scope;
    let component;

    const queryElement = (angularElement, selector) => {
        return angular.element(angularElement[0].querySelector(selector));
    };

    const queryElements = (angularElement, selector) => {
        return [...angularElement[0].querySelectorAll(selector)];
    };

    beforeEach(angular.mock.module(moduleName));

    beforeEach(angular.mock.module(($provide) => {
        $provide.value('translateFilter', input => input);
    }));

    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        scope.items = ['Item1', 'Item2'].map(name => ({
            name
        }));
        const element = angular.element('<oauth2-authorization-proxy-demo-app-home-page items="items"></oauth2-authorization-proxy-demo-app-home-page>');
        component = $compile(element)(scope);
        scope.$digest();
    }));

    it('should have a title', () => {
        const titleElement = queryElement(component, 'md-card md-card-title md-card-title-text .md-headline');
        expect(titleElement.text()).to.equal('OAuth2AuthorizationProxy.Demo.HomePage.Title');
    });

    it('should have an item list', () => {
        const items = queryElements(component, 'md-card md-card-content ul li');
        const itemNames = items.map(item => item.textContent);
        expect(itemNames).to.deep.equal(scope.items.map(item => item.name));
    });

    it('should have an image', () => {
        const image = queryElement(component, 'md-card md-card-content p img');
        expect(image.attr('src')).to.be.a.string;
        expect(image.attr('alt')).to.equal('OAuth2AuthorizationProxy.Demo.HomePage.Image.alt');
    });
});
