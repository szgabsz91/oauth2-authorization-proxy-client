const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({ libraryName, rootFolder, useHTML, useSCSS, useImages, isAngularJS, excludeFromInstrumentation, env }) => {
    const result = {
        entry: path.resolve(rootFolder, 'src', 'index.js'),
        mode: env.includes('test') ? 'development' : 'production',
        devtool: env.includes('test') ? 'inline-source-map' : 'source-map',
        output: {
            path: path.resolve(rootFolder, 'dist'),
            filename: `${libraryName}.js`,
            library: libraryName,
            library: libraryName,
            libraryTarget: 'umd'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: isAngularJS ? [
                        ['angularjs-annotate', { explicitOnly: true }]
                    ] : []
                }
            }]
        },
        plugins: []
    };

    if (useHTML) {
        result.module.rules.push({
            test: /\.html$/,
            exclude: [
                path.resolve(__dirname, '..', 'src', 'index.html')
            ],
            use: isAngularJS ? [
                'ngtemplate-loader',
                'html-loader'
            ] : [
                'html-loader'
            ]
        });
    }

    if (useSCSS) {
        result.module.rules.push({
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        });
        result.plugins.push(new MiniCssExtractPlugin({
            filename: `${libraryName}.css`,
            chunkFilename: `${libraryName}.css`
        }));
    }

    if (useImages) {
        result.module.rules.push({
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader'
        });
    }

    if (env === 'test') {
        result.module.rules.push({
            test: /\.js$/,
            use: {
                loader: 'istanbul-instrumenter-loader',
                options: {
                    esModules: true
                }
            },
            enforce: 'post',
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ]
        });
    }

    if (excludeFromInstrumentation) {
        const rule = result.module.rules.find(rule => rule.use && rule.use.loader === 'istanbul-instrumenter-loader');
        if (rule) {
            rule.exclude = [
                ...rule.exclude,
                ...excludeFromInstrumentation
            ];
        }
    }

    if (!env.includes('test')) {
        result.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true
                })
            ]
        };
    }

    return result;
};
