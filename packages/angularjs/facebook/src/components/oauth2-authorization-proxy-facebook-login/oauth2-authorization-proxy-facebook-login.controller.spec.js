import moduleName from '../../index';
import { componentName } from './oauth2-authorization-proxy-facebook-login.component';

describe('OAuth2AuthorizationProxyFacebookLoginComponentController', () => {
    let controller;
    let OAuth2AuthorizationProxyFacebookService;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($componentController, _OAuth2AuthorizationProxyFacebookService_) => {
        OAuth2AuthorizationProxyFacebookService = _OAuth2AuthorizationProxyFacebookService_;

        const locals = {};
        const bindings = {};
        controller = $componentController(componentName, locals, bindings);
    }));

    afterEach(() => {
        sinon.restore();
    });

    describe('login', () => {
        it('should invoke OAuth2AuthorizationProxyFacebookService.login', () => {
            sinon.stub(OAuth2AuthorizationProxyFacebookService, 'login');
            controller.login();
            expect(OAuth2AuthorizationProxyFacebookService.login).to.have.been.calledOnce;
        });
    });
});
