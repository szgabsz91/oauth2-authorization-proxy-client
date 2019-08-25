import angularTranslate from 'angular-translate';
import core from '@szg/oauth2-authorization-proxy-client-angularjs-core';
import OAuth2AuthorizationProxyFacebook from '@szg/oauth2-authorization-proxy-client-vanillajs-facebook';

import { vanillaConstantName } from './configuration/oauth2-authorization-proxy-facebook.configuration';
import OAuth2AuthorizationProxyFacebookConfig from './index.config';
import OAuth2AuthorizationProxyFacebookTranslations from './index.translations';
import OAuth2AuthorizationProxyFacebookService, { serviceName as oauth2AuthorizationProxyFacebookServiceName } from './services/oauth2-authorization-proxy-facebook.service';
import OAuth2AuthorizationProxyFacebookLoginComponent, { componentName as oauth2AuthorizationProxyFacebookLoginComponentName } from './components/oauth2-authorization-proxy-facebook-login/oauth2-authorization-proxy-facebook-login.component';

import './index.scss';

export default angular.module('oauth2AuthorizationProxyClient.angularJs.facebook', [
    angularTranslate,
    core
])
.constant(vanillaConstantName, new OAuth2AuthorizationProxyFacebook())
.config(OAuth2AuthorizationProxyFacebookConfig)
.config(OAuth2AuthorizationProxyFacebookTranslations)
.factory(oauth2AuthorizationProxyFacebookServiceName, OAuth2AuthorizationProxyFacebookService)
.component(oauth2AuthorizationProxyFacebookLoginComponentName, OAuth2AuthorizationProxyFacebookLoginComponent)
.name;
