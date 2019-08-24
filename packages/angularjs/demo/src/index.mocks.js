/* istanbul ignore file */

const items = [...Array(10).keys()]
    .map(index => index + 1)
    .map(index => ({
        name: `Item ${index}`
    }));

const userInfo = {
    id: 'user007',
    email: 'james@bond.com',
    name: 'James Bond',
    gender: 'male',
    link: 'https://www.facebook.com/JamesBond007',
    profilePictureUrl:
        'https://www.washingtonpost.com/resizer/zVR3Zw4H2EYR1sK31MR9BAjrRto=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/4WIWQEGDNMI6TC7XZXRNTYEQKU.jpg'
};

// istanbul ignore next
function isRequestAuthorized(headers) {
    const authorizationHeader = headers.Authorization;
    if (!authorizationHeader) {
        return false;
    }
    const accessToken = authorizationHeader.substring('Bearer '.length);
    if (!accessToken) {
        return false;
    }
    const oauth2Provider = headers['X-OAuth2-Provider'];
    if (!oauth2Provider) {
        return false;
    }
    return true;
}

function respondIfAuthorized(headers, response) {
    if (!isRequestAuthorized(headers)) {
        return [401];
    }
    return [200, response];
}

export default function OAuth2AuthorizationProxyDemoAppMocks($httpBackend) {
    'ngInject';

    $httpBackend.whenGET('items').respond((method, url, data, headers) => {
        return respondIfAuthorized(headers, items);
    });

    $httpBackend.whenGET('api/users/me').respond((method, url, data, headers) => {
        return respondIfAuthorized(headers, userInfo);
    });

    $httpBackend.whenGET(/assets.*/).passThrough();
}
