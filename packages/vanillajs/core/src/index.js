export default class OAuth2AuthorizationProxyCore {
    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
    }

    getCurrentOAuth2ProviderId() {
        const storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
        const authentication = storage.authentication || {};
        return authentication.oauth2ProviderId;
    }

    getPreferredOAuth2ProviderId() {
        const storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
        return storage.preferredOAuth2ProviderId;
    }

    getAccessToken() {
        const storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
        const authentication = storage.authentication || {};
        return authentication.accessToken;
    }

    getUserInfo() {
        const storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
        const authentication = storage.authentication || {};
        return authentication.userInfo;
    }

    storeData({ oauth2ProviderId, accessToken, userInfo, preferredOAuth2ProviderId }) {
        if (!oauth2ProviderId) {
            throw new Error('No OAuth2 provider ID was provided');
        }

        if (!accessToken) {
            throw new Error('No access token was provided');
        }

        const oldData = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
        const data = {
            ...oldData,
            authentication: {
                oauth2ProviderId,
                accessToken,
                userInfo
            },
            preferredOAuth2ProviderId
        };
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    }

    invalidateAccessToken() {
        const storage = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (!storage) {
            return;
        }
        delete storage.authentication;
        localStorage.setItem(this.localStorageKey, JSON.stringify(storage));
    }
}
