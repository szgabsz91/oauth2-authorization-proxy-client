export default function OAuth2AuthorizationProxyFacebookLoginComponentController(OAuth2AuthorizationProxyFacebookService) {
    'ngInject';

    this.login = () => OAuth2AuthorizationProxyFacebookService.login();
}
