import OAuth2AuthorizationProxyCore from './index';

describe('OAuth2AuthorizationProxyCore', () => {
    let oauth2AuthorizationProxyCore;
    const localStorageKey = 'localStorageKey';

    beforeEach(() => {
        oauth2AuthorizationProxyCore = new OAuth2AuthorizationProxyCore(localStorageKey);
        window.localStorage.clear();
    });

    describe('constructor', () => {
        it('should set the localStorageKey property', () => {
            expect(oauth2AuthorizationProxyCore.localStorageKey).to.equal(localStorageKey);
        });
    });

    describe('getCurrentOAuth2ProviderId', () => {
        it('should return undefined if there is no stored current OAuth2 provider', () => {
            const result = oauth2AuthorizationProxyCore.getCurrentOAuth2ProviderId();
            expect(result).to.be.undefined;
        });

        it('should return undefined if there is no stored authentication object in local storage', () => {
            window.localStorage.setItem(localStorageKey, JSON.stringify({}));
            const result = oauth2AuthorizationProxyCore.getCurrentOAuth2ProviderId();
            expect(result).to.be.undefined;
        });

        it('should return the id of the current OAuth2 provider if it is stored in local storage', () => {
            const oauth2ProviderId = 'oauth2ProviderId';
            window.localStorage.setItem(
                localStorageKey,
                JSON.stringify({
                    authentication: {
                        oauth2ProviderId
                    }
                })
            );
            const result = oauth2AuthorizationProxyCore.getCurrentOAuth2ProviderId();
            expect(result).to.equal(oauth2ProviderId);
        });
    });

    describe('getPreferredOAuth2ProviderId', () => {
        it('should return undefined if there is no stored object in local storage', () => {
            const result = oauth2AuthorizationProxyCore.getPreferredOAuth2ProviderId();
            expect(result).to.be.undefined;
        });

        it('should return the id of the preferred OAuth2 provider if it is stored in local storage', () => {
            const preferredOAuth2ProviderId = 'preferredOAuth2ProviderId';
            window.localStorage.setItem(
                localStorageKey,
                JSON.stringify({
                    preferredOAuth2ProviderId
                })
            );
            const result = oauth2AuthorizationProxyCore.getPreferredOAuth2ProviderId();
            expect(result).to.equal(preferredOAuth2ProviderId);
        });
    });

    describe('getAccessToken', () => {
        it('should return undefined if there is no stored access token', () => {
            const result = oauth2AuthorizationProxyCore.getAccessToken();
            expect(result).to.be.undefined;
        });

        it('should return undefined if there is no stored authentication object in local storage', () => {
            window.localStorage.setItem(localStorageKey, JSON.stringify({}));
            const result = oauth2AuthorizationProxyCore.getAccessToken();
            expect(result).to.be.undefined;
        });

        it('should return the access token if it is stored in local storage', () => {
            const accessToken = 'accessToken';
            window.localStorage.setItem(
                localStorageKey,
                JSON.stringify({
                    authentication: {
                        accessToken
                    }
                })
            );
            const result = oauth2AuthorizationProxyCore.getAccessToken();
            expect(result).to.equal(accessToken);
        });
    });

    describe('getUserInfo', () => {
        it('should return undefined if there is no stored access token', () => {
            const result = oauth2AuthorizationProxyCore.getUserInfo();
            expect(result).to.be.undefined;
        });

        it('should return undefined if there is no stored authentication object in local storage', () => {
            window.localStorage.setItem(localStorageKey, JSON.stringify({}));
            const result = oauth2AuthorizationProxyCore.getUserInfo();
            expect(result).to.be.undefined;
        });

        it('should return the user info if it is stored in local storage', () => {
            const userInfo = 'userInfo';
            window.localStorage.setItem(
                localStorageKey,
                JSON.stringify({
                    authentication: {
                        userInfo
                    }
                })
            );
            const result = oauth2AuthorizationProxyCore.getUserInfo();
            expect(result).to.equal(userInfo);
        });
    });

    describe('storeData', () => {
        const oauth2ProviderId = 'oauth2ProviderId';
        const accessToken = 'accessToken';
        const userInfo = 'userInfo';
        const preferredOAuth2ProviderId = 'preferredOAuth2ProviderId';

        it('should throw an error if there is no provided OAuth2 provider id', () => {
            const functionToTest = () => oauth2AuthorizationProxyCore.storeData({});
            expect(functionToTest).to.throw(Error, 'No OAuth2 provider ID was provided');
        });

        it('should throw an error if there is no provided access token', () => {
            const functionToTest = () =>
                oauth2AuthorizationProxyCore.storeData({
                    oauth2ProviderId
                });
            expect(functionToTest).to.throw(Error, 'No access token was provided');
        });

        it('should set the object in local storage if there was no previously stored object', () => {
            oauth2AuthorizationProxyCore.storeData({
                oauth2ProviderId,
                accessToken,
                userInfo,
                preferredOAuth2ProviderId
            });

            const result = JSON.parse(window.localStorage.getItem(localStorageKey));
            expect(result).to.deep.equal({
                authentication: {
                    oauth2ProviderId,
                    accessToken,
                    userInfo
                },
                preferredOAuth2ProviderId
            });
        });

        it('should not reset all properties if they have already been stored in local storage', () => {
            window.localStorage.setItem(
                localStorageKey,
                JSON.stringify({
                    something: 'something'
                })
            );

            oauth2AuthorizationProxyCore.storeData({
                oauth2ProviderId,
                accessToken,
                userInfo,
                preferredOAuth2ProviderId
            });

            const result = JSON.parse(window.localStorage.getItem(localStorageKey));
            expect(result).to.deep.equal({
                something: 'something',
                authentication: {
                    oauth2ProviderId,
                    accessToken,
                    userInfo
                },
                preferredOAuth2ProviderId
            });
        });
    });

    describe('invalidateAccessToken', () => {
        it('should do nothing if the local storage is empty', () => {
            oauth2AuthorizationProxyCore.invalidateAccessToken();
            const result = window.localStorage.getItem(localStorageKey);
            expect(result).to.be.null;
        });

        it('should delete the authentication subobject if the local storage is not empty', () => {
            window.localStorage.setItem(
                localStorageKey,
                JSON.stringify({
                    something: 'something',
                    authentication: 'authentication'
                })
            );

            oauth2AuthorizationProxyCore.invalidateAccessToken();

            const result = JSON.parse(window.localStorage.getItem(localStorageKey));
            expect(result).to.deep.equal({
                something: 'something'
            });
        });
    });
});
