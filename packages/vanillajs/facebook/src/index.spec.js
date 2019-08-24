import OAuth2AuthorizationProxyFacebook from './index';

describe('OAuth2AuthorizationProxyFacebook', () => {
    let oauth2AuthorizationProxyFacebook;

    beforeEach(() => {
        oauth2AuthorizationProxyFacebook = new OAuth2AuthorizationProxyFacebook();
        window.FB = null;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('loadLibrary', () => {
        it('should throw an error if there is no provided appId', done => {
            oauth2AuthorizationProxyFacebook
                .loadLibrary({})
                .then(() => done(new Error('Should have thrown an error')))
                .catch(error => {
                    try {
                        expect(error.message).to.equal('No appId provided');
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });

        it('should load the Facebook library if there is a provided appId', () => {
            const appId = 'appId';
            oauth2AuthorizationProxyFacebook.loadLibrary({ appId });
        });
    });

    describe('login', () => {
        it('should reject if there is no authResponse', done => {
            const expectedOptions = {
                scope: 'email,user_gender,user_link'
            };
            window.FB = {
                login: sinon.stub()
            };
            window.FB.login.callsFake((callback, options) => {
                expect(options).to.deep.equal(expectedOptions);
                callback({});
            });
            oauth2AuthorizationProxyFacebook
                .login()
                .then(() => done(new Error('Should have rejected')))
                .catch(() => done());
        });

        it('should resolve if there is an authResponse', done => {
            const expectedOptions = {
                scope: 'email,user_gender,user_link'
            };
            window.FB = {
                login: sinon.stub()
            };
            window.FB.login.callsFake((callback, options) => {
                expect(options).to.deep.equal(expectedOptions);
                callback({
                    authResponse: true
                });
            });
            oauth2AuthorizationProxyFacebook
                .login()
                .then(() => done())
                .catch(() => done(new Error('Should have resolved')));
        });
    });

    describe('logout', () => {
        it('should logout and resolve', done => {
            window.FB = {
                logout: sinon.stub()
            };
            window.FB.logout.callsFake(callback => callback());

            oauth2AuthorizationProxyFacebook
                .logout()
                .then(() => done())
                .catch(() => done(new Error('Should have resolved')));
        });
    });
});
