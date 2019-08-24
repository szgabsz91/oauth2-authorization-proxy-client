export default function OAuth2AuthorizationProxyCoreTranslations($translateProvider) {
    'ngInject';

    $translateProvider
        .translations('en', {
            OAuth2AuthorizationProxy: {
                Core: {
                    Header: {
                        ProfilePicture: {
                            alt: 'Profile picture'
                        },
                        UserSettings: {
                            label: 'User settings'
                        },
                        Menu: {
                            ViewProfile: {
                                text: 'View profile'
                            },
                            Logout: {
                                text: 'Logout'
                            }
                        },
                        Login: {
                            LoginWith: 'Login with',
                            Or: 'or',
                            AnotherProvider: 'another provider',
                            Login: 'Login'
                        }
                    }
                }
            }
        });
};
