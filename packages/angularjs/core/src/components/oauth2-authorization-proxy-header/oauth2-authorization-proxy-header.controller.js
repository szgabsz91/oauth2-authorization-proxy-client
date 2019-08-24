export default function OAuth2AuthorizationProxyHeaderComponentController($injector, $rootScope, $window, OAuth2AuthorizationProxyService, OAuth2AuthorizationProxyConfiguration) {

    this.preferredOAuth2Provider = null;
    this.userInfo = null;
    this.profilePictureUrl = null;
    this.loginStateName = null;

    const unsubscribeLoggedIn = $rootScope.$on(OAuth2AuthorizationProxyConfiguration.events.loggedIn, () => {
        this.preferredOAuth2Provider = OAuth2AuthorizationProxyService.getPreferredOAuth2Provider();
        this.userInfo = OAuth2AuthorizationProxyService.getUserInfo();
        this.profilePictureUrl = OAuth2AuthorizationProxyConfiguration.profilePictureUrlMapper(this.userInfo);
    });

    const unsubscribeLoggedOut = $rootScope.$on(OAuth2AuthorizationProxyConfiguration.events.loggedOut, () => {
        this.userInfo = null;
        this.profilePictureUrl = null;
    });

    this.$onInit = () => {
        this.preferredOAuth2Provider = OAuth2AuthorizationProxyService.getPreferredOAuth2Provider();
        this.userInfo = OAuth2AuthorizationProxyService.getUserInfo();
        this.profilePictureUrl = this.userInfo ?
            OAuth2AuthorizationProxyConfiguration.profilePictureUrlMapper(this.userInfo) :
            null;
        this.loginStateName = OAuth2AuthorizationProxyConfiguration.stateNames.login;
    };

    this.$onDestroy = () => {
        unsubscribeLoggedIn();
        unsubscribeLoggedOut();
    };

    this.onLoginButtonClicked = oauth2Provider => {
        $injector.invoke(oauth2Provider.loginFunction);
    };

    this.onViewProfileButtonClicked = () => {
        if (this.goToProfile) {
            this.goToProfile();
        }
        else {
            $window.open(this.userInfo.link);
        }
    };

    this.onLogoutButtonClicked = () => OAuth2AuthorizationProxyService.logout();
}
