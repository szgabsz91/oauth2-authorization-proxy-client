import angularTranslate from 'angular-translate';
import core from '@szg/oauth2-authorization-proxy-client-angularjs-core';
import OAuth2AuthorizationProxyGoogle from '@szg/oauth2-authorization-proxy-client-vanillajs-google';

import { vanillaConstantName } from './configuration/oauth2-authorization-proxy-google.configuration';
import OAuth2AuthorizationProxyGoogleConfig from './index.config';
import OAuth2AuthorizationProxyGoogleTranslations from './index.translations';
import OAuth2OAuth2AuthorizationProxyGoogleService, { serviceName as oauth2AuthorizationProxyGoogleServiceName } from './services/oauth2-authorization-proxy-google.service';
import OAuth2AuthorizationProxyGoogleLoginComponent, { componentName as oauth2AuthorizationProxyGoogleLoginComponentName } from './components/oauth2-authorization-proxy-google-login/oauth2-authorization-proxy-google-login.component';

import './index.scss';

export default angular.module('oauth2AuthorizationProxyClient.angularJs.google', [
    angularTranslate,
    core
])
.constant(vanillaConstantName, new OAuth2AuthorizationProxyGoogle())
.config(OAuth2AuthorizationProxyGoogleConfig)
.config(OAuth2AuthorizationProxyGoogleTranslations)
.factory(oauth2AuthorizationProxyGoogleServiceName, OAuth2OAuth2AuthorizationProxyGoogleService)
.component(oauth2AuthorizationProxyGoogleLoginComponentName, OAuth2AuthorizationProxyGoogleLoginComponent)
.name;
