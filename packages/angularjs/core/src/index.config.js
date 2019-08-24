import OAuth2AuthorizationProxyCore from '@szgabsz91/oauth2-authorization-proxy-client-vanillajs-core';
import { vanillaConstantName } from './configuration/oauth2-authorization-proxy.configuration';

export default function OAuth2AuthorizationProxyCoreConfig($provide, OAuth2AuthorizationProxyConfiguration) {
    'ngInject';
    $provide.constant(vanillaConstantName, new OAuth2AuthorizationProxyCore(OAuth2AuthorizationProxyConfiguration.localStorageKey));
}
