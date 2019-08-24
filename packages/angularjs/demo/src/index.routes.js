import { componentName as oauth2AuthorizationProxyDemoAppComponentName } from './pages/oauth2-authorization-proxy-demo-app/oauth2-authorization-proxy-demo-app.component';
import { componentName as oauth2AuthorizationProxyDemoAppHomePageComponentName } from './pages/oauth2-authorization-proxy-demo-app-home-page/oauth2-authorization-proxy-demo-app-home-page.component';
import { componentName as oauth2AuthorizationProxyDemoAppLoginPageComponentName } from './pages/oauth2-authorization-proxy-demo-app-login-page/oauth2-authorization-proxy-demo-app-login-page.component';

export default function OAuth2AuthorizationProxyDemoAppRouteConfig($stateProvider, $urlRouterProvider, $locationProvider, OAuth2AuthorizationProxyDemoAppConfiguration) {
    'ngInject';

    $stateProvider
        .state({
            name: 'app',
            abstract: true,
            component: oauth2AuthorizationProxyDemoAppComponentName,
            resolve: {
                facebook: function facebook(OAuth2AuthorizationProxyFacebookService) {
                    'ngInject';
                    return OAuth2AuthorizationProxyFacebookService.start({
                        appId: OAuth2AuthorizationProxyDemoAppConfiguration.facebookAppId
                    });
                },
                google: function google(OAuth2AuthorizationProxyGoogleService) {
                    'ngInject';
                    return OAuth2AuthorizationProxyGoogleService.start({
                        clientId: OAuth2AuthorizationProxyDemoAppConfiguration.googleClientId
                    });
                }
            }
        })
        .state({
            name: 'app.home',
            url: '/',
            component: oauth2AuthorizationProxyDemoAppHomePageComponentName,
            resolve: {
                items(OAuth2AuthorizationProxyDemoAppHomePageService) {
                    'ngInject';
                    return OAuth2AuthorizationProxyDemoAppHomePageService.getItems();
                }
            }
        })
        .state({
            name: 'app.login',
            url: '/login',
            component: oauth2AuthorizationProxyDemoAppLoginPageComponentName
        });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
}
