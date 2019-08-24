export default class OAuth2AuthorizationProxyGoogle {
    loadLibrary(options) {
        return new Promise((resolve, reject) => {
            const googleOptions = {
                discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
                scope: 'openid email',
                ...options
            };

            if (!googleOptions.clientId) {
                throw new Error('No clientId provided');
            }

            const script = document.createElement('script');
            script.async = '';
            script.defer = '';
            script.src = 'https://apis.google.com/js/api.js';
            // istanbul ignore next
            script.onload = () => gapi.load('client:auth2', initClient);
            // istanbul ignore next
            script.onreadystatechange = () => {
                if (this.readyState === 'complete') {
                    this.onload();
                }
            };
            document.head.appendChild(script);

            // istanbul ignore next
            function initClient() {
                gapi.client
                    .init(googleOptions)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }

    login() {
        return gapi.auth2.getAuthInstance().signIn();
    }

    logout() {
        return gapi.auth2.getAuthInstance().signOut();
    }
}
