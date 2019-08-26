const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({ rootFolder, useHTML, useSCSS, useImages, isAngularJS, aliases = {}, excludeFromInstrumentation, env }) => {
    const result = {
        entry: path.resolve(rootFolder, 'src', 'index.js'),
        mode: env.includes('test') || env === 'development' ? 'development' : 'production',
        devtool: env.includes('test') ? 'inline-source-map' : 'source-map',
        output: {
            path: path.resolve(rootFolder, 'dist'),
            filename: env !== 'production' ? 'js/bundle.js' : 'js/bundle-[chunkhash].js'
        },
        resolve: {
            alias: {
                ...aliases
            }
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
            filename: 'styles.css',
            chunkFilename: '[name].css'
        }));
    }

    if (useImages) {
        result.module.rules.push({
            test: /\.(png|jpe?g|gif)$/,
            loader: 'image-webpack-loader',
            enforce: 'pre'
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'url-loader',
            options: {
                limit: 10 * 1024
            }
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

    if (!env.includes('test') && env !== 'development') {
        result.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true
                })
            ]
        };

        if (useSCSS) {
            result.optimization.minimizer.push(new OptimizeCSSAssetsWebpackPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false
                    }
                }
            }));
        }
    }

    if (env === 'development') {
        result.devServer = {
            contentBase: path.join(rootFolder, 'dist'),
            compress: true,
            port: 8080,
            proxy: {
                '/api': {
                    target: 'http://localhost:8081',
                    pathRewrite: {
                        '^/api' : ''
                    }
                }
            }
        };
        result.plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(rootFolder, 'src', 'index.ejs'),
            templateParameters: {
                'BASE_URL': '/'
            },
        }));
    }

    if (env === 'production') {
        result.plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(rootFolder, 'src', 'index.ejs'),
            templateParameters: {
                'BASE_URL': 'https://szgabsz91.github.io/oauth2-authorization-proxy-client/'
            },
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }));
    }

    return result;
};
