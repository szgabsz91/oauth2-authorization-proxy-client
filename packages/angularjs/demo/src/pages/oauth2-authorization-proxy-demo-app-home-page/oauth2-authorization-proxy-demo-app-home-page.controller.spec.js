import moduleName from '../../index';
import { componentName } from './oauth2-authorization-proxy-demo-app-home-page.component';

describe('OAuth2AuthorizationProxyDemoAppHomePageComponentController', () => {
    let controller;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($componentController, _$rootScope_, _$window_, _OAuth2AuthorizationProxyService_, _OAuth2AuthorizationProxyConfiguration_) => {
        const locals = {};
        const bindings = {};
        controller = $componentController(componentName, locals, bindings);
    }));

    it('should have an imageSource', () => {
        expect(controller.imageSource).to.be.a.string;
    });
});
