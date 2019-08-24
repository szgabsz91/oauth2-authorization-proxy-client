export default function OAuth2AuthorizationProxyGoogleLoginComponentController(OAuth2AuthorizationProxyGoogleService) {
    'ngInject';

    this.login = () => OAuth2AuthorizationProxyGoogleService.login();
}
