const path = require('path');

module.exports = (config, rootFolder, excludeFromInstrumentation) => {
    config.set({
        frameworks: [
            'mocha',
            'chai-sinon'
        ],
        reporters: [
            'progress',
            'coverage-istanbul'
        ],
        browsers: [
            'ChromeHeadless'
        ],
        files: [{
            pattern: path.resolve(rootFolder, 'src', 'tests.spec.js'),
            watched: false
        }],
        preprocessors: {
            '**/*.spec.js': ['webpack'],
            [path.resolve(rootFolder, 'src', 'tests.spec.js')]: ['webpack', 'sourcemap']
        },
        webpack: require(path.resolve(rootFolder, 'webpack.config.js'))(excludeFromInstrumentation),
        coverageIstanbulReporter: {
            reports: ['html'],
            dir: path.join(rootFolder, 'coverage'),
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: false,
            'report-config': {
                html: {
                    subdir: 'html'
                }
            },
            thresholds: {
                emitWarning: false,
                global: {
                    statements: 100,
                    lines: 100,
                    branches: 100,
                    functions: 100
                },
                each: {
                    statements: 100,
                    lines: 100,
                    branches: 100,
                    functions: 100
                }
            }
        },
        verbose: true,
        instrumentation: {
            'default-excludes': true
        }
    });
};
