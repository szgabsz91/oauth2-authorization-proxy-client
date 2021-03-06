const generateWebpackConfig = require('../../../config/webpack.config.generator');

module.exports = () => {
    return generateWebpackConfig({
        type: 'library',
        libraryName: 'oauth2-authorization-proxy-client-vanillajs-facebook',
        rootFolder: __dirname,
        env: process.env.NODE_ENV
    });
};
