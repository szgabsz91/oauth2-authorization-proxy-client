const karmaConfigGenerator = require('../../../config/karma.config.generator');

module.exports = config => karmaConfigGenerator(config, __dirname, [
    /angularjs\/core/,
    /angularjs\/facebook/,
    /angularjs\/google/,
    /vanillajs/
]);
