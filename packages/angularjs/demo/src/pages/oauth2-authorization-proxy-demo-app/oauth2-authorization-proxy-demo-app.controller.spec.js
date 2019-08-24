import moduleName from '../../index';
import { componentName } from './oauth2-authorization-proxy-demo-app.component';

describe('OAuth2AuthorizationProxyDemoAppComponentController', () => {
    let controller;
    let sidenavToggleSpy;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject(($componentController) => {
        sidenavToggleSpy = sinon.spy();
        const $mdSidenav = name => {
            if (name !== 'sidenav') {
                throw new Error('Invalid name: ' + name);
            }

            return {
                toggle: sidenavToggleSpy
            };
        };

        const locals = {
            $mdSidenav
        };
        const bindings = {};
        controller = $componentController(componentName, locals, bindings);
    }));

    afterEach(() => {
        sinon.restore();
    })

    describe('toggleSidenav', () => {
        it('should toggle the sidenav', () => {
            controller.toggleSidenav();
            expect(sidenavToggleSpy).to.have.been.calledOnce;
        });
    });
});
