export default function OAuth2AuthorizationProxyDemoAppComponentController($mdSidenav) {
    'ngInject';

    this.toggleSidenav = () => $mdSidenav('sidenav').toggle();
}
