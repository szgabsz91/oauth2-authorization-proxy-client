import OAuth2AuthorizationProxyGoogle from './index';

describe('OAuth2AuthorizationProxyGoogle', () => {
    let oauth2AuthorizationProxyGoogle;

    beforeEach(() => {
        oauth2AuthorizationProxyGoogle = new OAuth2AuthorizationProxyGoogle();
        window.gapi = null;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('loadLibrary', () => {
        it('should throw an error if there is no provided clientId', done => {
            oauth2AuthorizationProxyGoogle
                .loadLibrary({})
                .then(() => done(new Error('Should have thrown an error')))
                .catch(error => {
                    try {
                        expect(error.message).to.equal('No clientId provided');
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });

        it('should load the Google library if there is a provided clientId', () => {
            const clientId = 'clientId';
            oauth2AuthorizationProxyGoogle.loadLibrary({ clientId });
        });
    });

    describe('login', () => {
        it('should reject if gapi.auth2.getAuthInstance().signIn() rejects', done => {
            const signIn = sinon.stub().returns(Promise.reject());
            window.gapi = {
                auth2: {
                    getAuthInstance() {
                        return {
                            signIn
                        };
                    }
                }
            };

            oauth2AuthorizationProxyGoogle
                .login()
                .then(() => done(new Error('Should have rejected')))
                .catch(() => done());
        });

        it('should resolve if gapi.auth2.getAuthInstance().signIn() resolves', done => {
            const signIn = sinon.stub().returns(Promise.resolve());
            window.gapi = {
                auth2: {
                    getAuthInstance() {
                        return {
                            signIn
                        };
                    }
                }
            };

            oauth2AuthorizationProxyGoogle
                .login()
                .then(() => done())
                .catch(() => done(new Error('Should have resolved')));
        });
    });

    describe('logout', () => {
        it('should reject if gapi.auth2.getAuthInstance().signOut() rejects', done => {
            const signOut = sinon.stub().returns(Promise.reject());
            window.gapi = {
                auth2: {
                    getAuthInstance() {
                        return {
                            signOut
                        };
                    }
                }
            };

            oauth2AuthorizationProxyGoogle
                .logout()
                .then(() => done(new Error('Should have rejected')))
                .catch(() => done());
        });

        it('should resolve if gapi.auth2.getAuthInstance().signOut() resolves', done => {
            const signOut = sinon.stub().returns(Promise.resolve());
            window.gapi = {
                auth2: {
                    getAuthInstance() {
                        return {
                            signOut
                        };
                    }
                }
            };

            oauth2AuthorizationProxyGoogle
                .logout()
                .then(() => done())
                .catch(() => done(new Error('Should have resolved')));
        });
    });
});
