const generateWebpackConfig = require('../../../config/webpack.config.generator');

module.exports = (excludeFromInstrumentation) => {
    return generateWebpackConfig({
        type: 'library',
        libraryName: 'oauth2-authorization-proxy-client-angularjs-core',
        rootFolder: __dirname,
        useHTML: true,
        useSCSS: true,
        isAngularJS: true,
        externals: [
            /@uirouter/,
            'angular',
            'angular-translate'
        ],
        env: process.env.NODE_ENV,
        excludeFromInstrumentation
    });
};
