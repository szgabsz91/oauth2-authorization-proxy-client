export const constantName = 'OAuth2AuthorizationProxyConfiguration';

export const vanillaConstantName = 'OAuth2AuthorizationProxyCore';

export default {
    localStorageKey: 'oauth2AuthorizationProxy',
    events: {
        loggedIn: 'loggedIn',
        loggedOut: 'loggedOut'
    },
    stateNames: {
        login: 'login',
        home: 'home'
    },
    urls: {
        userInfo: 'api/users/me'
    },
    protectedImageUrlPredicate: url => url.origin === location.origin && url.pathname.startsWith('/api'),
    profilePictureUrlMapper: userInfo => userInfo.profilePictureUrl,
    redirectDebounceTimeInMilliseconds: 500
};
