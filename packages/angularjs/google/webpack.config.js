const generateWebpackConfig = require('../../../config/webpack.config.generator');

module.exports = (excludeFromInstrumentation) => {
    return generateWebpackConfig({
        type: 'library',
        libraryName: 'oauth2-authorization-proxy-client-angularjs-google',
        rootFolder: __dirname,
        useHTML: true,
        useSCSS: true,
        useImages: true,
        isAngularJS: true,
        externals: [
            /@uirouter/,
            'angular',
            'angular-translate',
            '@szg/oauth2-authorization-proxy-client-angularjs-core'
        ],
        env: process.env.NODE_ENV,
        excludeFromInstrumentation
    });
};
