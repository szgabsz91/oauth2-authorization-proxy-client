const generateWebpackConfig = require('../../../config/webpack.config.generator');

module.exports = (excludeFromInstrumentation) => {
    return generateWebpackConfig({
        type: 'app',
        rootFolder: __dirname,
        useHTML: true,
        useSCSS: true,
        useImages: true,
        isAngularJS: true,
        env: process.env.NODE_ENV,
        excludeFromInstrumentation
    });
};
