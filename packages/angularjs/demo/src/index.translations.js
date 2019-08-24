export default function OAuth2AuthorizationProxyDemoAppTranslations($translateProvider) {
    'ngInject';

    $translateProvider
        .useSanitizeValueStrategy('sanitize')
        .translations('en', {
            OAuth2AuthorizationProxy: {
                Demo: {
                    App: {
                        Menu: {
                            HamburgerIcon: {
                                label: 'Menu'
                            },
                            Title: 'Menu',
                            Home: 'Home',
                            Login: 'Login'
                        },
                        Title: 'OAuth2 Authorization Proxy Client AngularJS Demo'
                    },
                    HomePage: {
                        Title: 'Items',
                        Image: {
                            alt: 'AngularJS logo'
                        }
                    },
                    LoginPage: {
                        Title: 'Login'
                    }
                }
            }
        })
        .preferredLanguage('en');
};
