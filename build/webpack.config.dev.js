const fs = require('fs');
const path = require('path');
// const blob = require('blob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const logger = require('../../server/logger');
// const pkg = require(path.resolve(process.cwd(), '..', 'package.json'));
// const { dllPlugin } = pkg;

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        template: 'template/index.html',
    }),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false,
    })
];

/*
if (dllPlugin) {
    glob.sync(`${dllPlugin.path}/*.dll.js`).forEach(dllPath => {
        plugins.push(
            new AddAssetHtmlPlugin({
                filepath: dllPath,
                includeSourcemap: false,
            }),
        );
    });
};
*/

module.exports = require('./webpack.config.base.js')({
    mode: 'development',
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '..', 'carousel.js')
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    optimization: {
        minimize: false,
    },
    plugins: plugins,
    devtool: 'eval-source-map',
    performance: {
        hints: false,
    },
});


