export default class OAuth2AuthorizationProxyFacebook {
    loadLibrary(options) {
        return new Promise((resolve, reject) => {
            const facebookOptions = {
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.0',
                ...options
            };

            if (!facebookOptions.appId) {
                reject(new Error('No appId provided'));
                return;
            }

            // istanbul ignore next
            window.fbAsyncInit = function facebookLibraryLoaded() {
                try {
                    FB.init(facebookOptions);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            const firstScript = document.getElementsByTagName('script')[0];
            const facebookScript = document.createElement('script');
            facebookScript.id = 'facebook-jssdk';
            facebookScript.src = 'https://connect.facebook.net/en_US/sdk.js';
            firstScript.parentNode.insertBefore(facebookScript, firstScript);
        });
    }

    login() {
        return new Promise((resolve, reject) => {
            const options = {
                scope: 'email,user_gender,user_link'
            };

            FB.login(response => {
                if (!response.authResponse) {
                    reject();
                    return;
                }

                resolve(response);
            }, options);
        });
    }

    logout() {
        return new Promise(resolve => {
            FB.logout(resolve);
        });
    }
}
