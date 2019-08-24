export default function OAuth2AuthorizationProxyGoogleTranslations($translateProvider) {
    'ngInject';

    $translateProvider
        .translations('en', {
            OAuth2AuthorizationProxy: {
                Google: {
                    Logo: {
                        label: 'Login with Google',
                        alt: 'Google logo'
                    }
                }
            }
        });
};
