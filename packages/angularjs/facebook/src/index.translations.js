export default function OAuth2AuthorizationProxyFacebookTranslations($translateProvider) {
    'ngInject';

    $translateProvider
        .translations('en', {
            OAuth2AuthorizationProxy: {
                Facebook: {
                    Logo: {
                        label: 'Login with Facebook',
                        alt: 'Facebook logo'
                    }
                }
            }
        });
};
