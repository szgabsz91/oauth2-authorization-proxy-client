import * as angular from 'angular';
import angularTranslate from 'angular-translate';
import uiRouter from '@uirouter/angularjs';

import Oauth2AuthorizationProxyConfiguration, { constantName as oauth2AuthorizationProxyConfigurationConstantName } from './configuration/oauth2-authorization-proxy.configuration';
import OAuth2AuthorizationProxyCoreConfig from './index.config';
import OAuth2AuthorizationProxyCoreTranslations from './index.translations';
import OAuth2AuthorizationProxyCoreRun from './index.run';
import OAuth2AuthorizationProxyServiceProvider, { providerName as oauth2AuthorizationProxyServiceProviderName } from './services/oauth2-authorization-proxy.service-provider';
import OAuth2AuthorizationProxyInterceptor, { interceptorName } from './interceptors/oauth2-authorization-proxy.interceptor';
import ImgDirective, { directiveName as imgDirectiveName } from './directives/img/img.directive';
import OAuth2AuthorizationProxyHeaderComponent, { componentName as oauth2AuthorizationProxyHeaderComponentName } from './components/oauth2-authorization-proxy-header/oauth2-authorization-proxy-header.component';
import OAuth2AuthorizationProxyLoginComponent, { componentName as oauth2AuthorizationProxyLoginComponentName } from './components/oauth2-authorization-proxy-login/oauth2-authorization-proxy-login.component';

import './index.scss';

export const oauth2AuthorizationProxyInterceptorName = interceptorName;

export default angular.module('oauth2AuthorizationProxyClient.angularJs.core', [
    angularTranslate,
    uiRouter
])
.constant(oauth2AuthorizationProxyConfigurationConstantName, Oauth2AuthorizationProxyConfiguration)
.config(OAuth2AuthorizationProxyCoreConfig)
.config(OAuth2AuthorizationProxyCoreTranslations)
.run(OAuth2AuthorizationProxyCoreRun)
.provider(oauth2AuthorizationProxyServiceProviderName, OAuth2AuthorizationProxyServiceProvider)
.factory(oauth2AuthorizationProxyInterceptorName, OAuth2AuthorizationProxyInterceptor)
.directive(imgDirectiveName, ImgDirective)
.component(oauth2AuthorizationProxyHeaderComponentName, OAuth2AuthorizationProxyHeaderComponent)
.component(oauth2AuthorizationProxyLoginComponentName, OAuth2AuthorizationProxyLoginComponent)
.name;
