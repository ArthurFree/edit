// import fs from 'fs';
// import path from 'path';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const path = require('path');
const webpack = require('webpack');

const ROOT_DIR = path.resolve(__dirname, '..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src');
const BUILD_DIR = resolvePath('build');
const DIST_DIR = resolvePath('dist');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

const reScript = /\.(js|jsx)$/;
const reStyle = /\.(css|less|scss|sass|styl)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

process.npDeprecation = true;

module.exports = options => ({
    mode: options.mode,
    entry: options.entry,
    output: Object(
        {
            path: DIST_DIR,
            publicPath: '/',
        },
        options.output,
    ),
    optimization: options.optimization,
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
    module: {
        rules: [
            {
                test: reScript,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: options.babelQuery,
                }
            },
            {
                test: reStyle,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10 * 1024,
                            noquotes: true,
                        }
                    }
                ],
            },
            {
                test: reImage,
                loader: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                        },
                    }
                ],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },
        ],
    },
    plugins: options.plugins.concat([
        // new webpack.ProvidePlugin({
            // fetch: 'exports-loader?self.fetch!whatwg-fetch',
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]),
});
