import moduleName from '../index';

describe('OAuth2AuthorizationProxyConfiguration', () => {
    let OAuth2AuthorizationProxyConfiguration;
    let $window;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(inject((_OAuth2AuthorizationProxyConfiguration_, _$window_) => {
        OAuth2AuthorizationProxyConfiguration = _OAuth2AuthorizationProxyConfiguration_;
        $window = _$window_;
    }));

    describe('protectedImageUrlPredicate', () => {
        it('should return false if the given URL has a different origin than the current site', () => {
            const url = new URL('http://somethingdifferent.com');
            const result = OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate(url);
            expect(result).to.be.false;
        });

        it('should return false if the given URL\'s pathname does not start with "/api"', () => {
            const url = new URL(`${$window.location.origin}/somethingdifferent`);
            const result = OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate(url);
            expect(result).to.be.false;
        });

        it('should return true if the given URL has the same origin as the current site and its pathname starts with "/api"', () => {
            const url = new URL(`${$window.location.origin}/api/something`);
            const result = OAuth2AuthorizationProxyConfiguration.protectedImageUrlPredicate(url);
            expect(result).to.be.true;
        });
    });

    describe('profilePictureUrlMapper', () => {
        it('should return the profilePictureUrl of the given object', () => {
            const input = {
                profilePictureUrl: 'profilePictureUrl'
            };
            const result = OAuth2AuthorizationProxyConfiguration.profilePictureUrlMapper(input);
            expect(result).to.equal(input.profilePictureUrl);
        });
    });
});
