'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
let SpritesmithPlugin = require('webpack-spritesmith');

let ROOT_PATH = path.resolve(__dirname);
let APP_PATH = path.resolve(ROOT_PATH, 'src/app');
let BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
let PUBLIC_PATH = path.resolve(ROOT_PATH, 'src/public');
let NODE_MODULE = path.resolve(ROOT_PATH, 'node_modules');

let ENV = process.env.npm_lifecycle_event; //server,build,test

module.exports = function makeWebpackConfig() {

    let config = {};

    config.entry = {
        app: path.resolve(APP_PATH, 'app.component.js'),
        vendors: [
            'jquery', 'moment', 'echarts', 'bootstrap/dist/css/bootstrap.min.css', 'font-awesome/css/font-awesome.min.css', 'react', 'react-dom'
        ]
    };

    config.output = {
        path: BUILD_PATH,
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    };

    config.devtool = 'source-map';

    config.resolve = {
        alias: {
            Component: path.resolve(APP_PATH, 'hello/'),
            Shared: path.resolve(APP_PATH, 'shared/'),
            Style: path.resolve(APP_PATH, 'style/'),
        },
        modules: ["node_modules", "spritesmith-generated"]
    };

    config.module = {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg|woff|woff2|ttf|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    };

    config.plugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(PUBLIC_PATH, 'index.html'),
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'manifest']
        }),
        new webpack.ProvidePlugin({
            'moment': 'moment',
            "$": "jquery",
            "jQuery": "jquery",
            "window.$": "jquery",
            "window.jQuery": "jquery",
            "echarts": "echarts",
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(PUBLIC_PATH, 'images/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(PUBLIC_PATH, 'images/spritesmith-generated/sprite.png'),
                css: [
                    path.resolve(PUBLIC_PATH, 'images/spritesmith-generated/sprite.scss'),
                    path.resolve(PUBLIC_PATH, 'images/spritesmith-generated/sprite.css'),
                ]
            },
            apiOptions: {
                cssImageRef: "./sprite.png"
            }
        })
    ];

    config.devServer = {
        contentBase: PUBLIC_PATH,
        watchContentBase: true,
        stats: 'minimal',
        historyApiFallback: true,
        port: 9999,
        host: '0.0.0.0'
    };

    switch (ENV) {
        case 'server':
            config.plugins = config.plugins.concat([
                new ExtractTextPlugin({
                    filename: '[name].bundle.css',
                    allChunks: true
                }),
            ]);
            break;
        case 'build':
            Object.assign(config.output, {
                publicPath: '/',
                filename: '[name].js',
                chunkFilename: '[name].js'
            });
            config.plugins = config.plugins.concat([
                new webpack.optimize.UglifyJsPlugin({
                    mangle: false
                }),
                new ExtractTextPlugin({
                    filename: '[name].css',
                    allChunks: true
                }),
                new CopyWebpackPlugin([{
                    from: __dirname + '/src/public'
                }])
            ])
    }

    return config;
}();