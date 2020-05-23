export const directiveName = 'img';

export default function ImgDirective($rootScope, OAuth2AuthorizationProxyService, OAuth2AuthorizationProxyConfiguration) {
    'ngInject';

    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            attrs.$observe('src', () => reevaluateSource());

            const unsubscribe = $rootScope.$on(OAuth2AuthorizationProxyConfiguration.events.loggedIn, () => reevaluateSource());

            scope.$on('$destroy', unsubscribe);

            function reevaluateSource() {
                const src = element[0].src;
                // TODO: Make it work for / and /something, too with the same BASE
                const url = new URL(src);
                const isProtectedImageUrl = OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate(url);
                if (!isProtectedImageUrl) {
                    return;
                }
                const oauth2Provider = OAuth2AuthorizationProxyService.getCurrentOAuth2Provider();
                const oauth2ProviderId = oauth2Provider ? oauth2Provider.id : null;
                const accessToken = OAuth2AuthorizationProxyService.getAccessToken();
                if (!oauth2ProviderId || !accessToken) {
                    return;
                }
                url.searchParams.set('access_token', accessToken);
                url.searchParams.set('oauth2_provider', oauth2ProviderId);
                const newSrc = `${url.protocol}//${url.host}${url.pathname}${url.search}`;
                if (newSrc !== src) {
                    attrs.$set('src', newSrc);
                }
            }
        }
    }
};
