const path = require('path');

const generateWebpackConfig = require('../../../config/webpack.config.generator');

module.exports = (excludeFromInstrumentation) => {
    return generateWebpackConfig({
        type: 'app',
        rootFolder: __dirname,
        useHTML: true,
        useSCSS: true,
        useImages: true,
        isAngularJS: true,
        aliases: {
            '@uirouter/angularjs': path.resolve(__dirname, 'node_modules', '@uirouter', 'angularjs'),
            '@uirouter/core': path.resolve(__dirname, 'node_modules', '@uirouter', 'core'),
            angular: path.resolve(__dirname, 'node_modules', 'angular'),
            'angular-translate': path.resolve(__dirname, 'node_modules', 'angular-translate')
        },
        env: process.env.NODE_ENV,
        excludeFromInstrumentation
    });
};
