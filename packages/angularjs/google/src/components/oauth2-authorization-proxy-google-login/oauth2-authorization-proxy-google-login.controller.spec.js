import moduleName from '../../index';
import { componentName } from './oauth2-authorization-proxy-google-login.component';

describe('OAuth2AuthorizationProxyGoogleLoginComponentController', () => {
    let controller;
    let OAuth2AuthorizationProxyGoogleService;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($componentController, _OAuth2AuthorizationProxyGoogleService_) => {
        OAuth2AuthorizationProxyGoogleService = _OAuth2AuthorizationProxyGoogleService_;

        const locals = {};
        const bindings = {};
        controller = $componentController(componentName, locals, bindings);
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('login', () => {
        it('should invoke OAuth2AuthorizationProxyGoogleService.login', () => {
            sinon.stub(OAuth2AuthorizationProxyGoogleService, 'login');
            controller.login();
            expect(OAuth2AuthorizationProxyGoogleService.login).to.have.been.calledOnce;
        });
    });
});
