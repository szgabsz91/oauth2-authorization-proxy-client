import * as angular from 'angular';
import angularMaterial from 'angular-material';
import 'angular-mocks';
import angularSanitize from 'angular-sanitize';
import angularTranslate from 'angular-translate';
import uiRouter from '@uirouter/angularjs';

import core from '@szg/oauth2-authorization-proxy-client-angularjs-core';
import facebook from '@szg/oauth2-authorization-proxy-client-angularjs-facebook';
import google from '@szg/oauth2-authorization-proxy-client-angularjs-google';

import OAuth2AuthorizationProxyDemoAppConfiguration, { constantName as oauth2AuthorizationProxyDemoAppConfigurationConstantName } from './configuration/oauth2-authorization-proxy-demo-app.configuration';
import OAuth2AuthorizationProxyDemoAppConfig from './index.config';
import OAuth2AuthorizationProxyDemoAppRouteConfig from './index.routes';
import OAuth2AuthorizationProxyDemoAppTranslations from './index.translations';
import OAuth2AuthorizationProxyDemoAppRun from './index.run';
import OAuth2AuthorizationProxyDemoAppMocks from './index.mocks';

import OAuth2AuthorizationProxyDemoAppComponent, { componentName as oauth2AuthorizationProxyDemoAppComponentName } from './pages/oauth2-authorization-proxy-demo-app/oauth2-authorization-proxy-demo-app.component';
import OAuth2AuthorizationProxyDemoAppHomePageService, { serviceName as oauth2AuthorizationProxyDemoAppHomePageServiceName } from './pages/oauth2-authorization-proxy-demo-app-home-page/oauth2-authorization-proxy-demo-app-home-page.service';
import OAuth2AuthorizationProxyDemoAppHomePageComponent, { componentName as oauth2AuthorizationProxyDemoAppHomePageComponentName } from './pages/oauth2-authorization-proxy-demo-app-home-page/oauth2-authorization-proxy-demo-app-home-page.component';
import OAuth2AuthorizationProxyDemoAppLoginPageComponent, { componentName as oauth2AuthorizationProxyDemoAppLoginPageComponentName } from './pages/oauth2-authorization-proxy-demo-app-login-page/oauth2-authorization-proxy-demo-app-login-page.component';

import './index.scss';

export default angular
    .module('oauth2AuthorizationProxyClient.angularJs.demo', [
        'ngMockE2E',
        uiRouter,
        angularMaterial,
        angularSanitize,
        angularTranslate,
        core,
        facebook,
        google
    ])
    .constant(oauth2AuthorizationProxyDemoAppConfigurationConstantName, OAuth2AuthorizationProxyDemoAppConfiguration)
    .config(OAuth2AuthorizationProxyDemoAppConfig)
    .config(OAuth2AuthorizationProxyDemoAppRouteConfig)
    .config(OAuth2AuthorizationProxyDemoAppTranslations)
    .run(OAuth2AuthorizationProxyDemoAppRun)
    .run(OAuth2AuthorizationProxyDemoAppMocks)
    .component(oauth2AuthorizationProxyDemoAppComponentName, OAuth2AuthorizationProxyDemoAppComponent)
    .factory(oauth2AuthorizationProxyDemoAppHomePageServiceName, OAuth2AuthorizationProxyDemoAppHomePageService)
    .component(oauth2AuthorizationProxyDemoAppHomePageComponentName, OAuth2AuthorizationProxyDemoAppHomePageComponent)
    .component(oauth2AuthorizationProxyDemoAppLoginPageComponentName, OAuth2AuthorizationProxyDemoAppLoginPageComponent)
    .name;
