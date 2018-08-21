const fs = require('fs');
const path = require('path');
// const blob = require('blob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const reTsScript = /\.(ts|tsx)$/;
const reStyle = /\.(css|less)$/;
// const logger = require('../../server/logger');
// const pkg = require(path.resolve(process.cwd(), '..', 'package.json'));
// const { dllPlugin } = pkg;

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        template: 'src/pages/docEditor/index.html',
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
        path.join(__dirname, '..', 'src/pages/docEditor/js/index.ts')
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    module: {
        rules: [
            {
                test: reTsScript,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            configFile: './tslint.json',
                            tsConfigFile: './tsconfig.json',
                            fix: false,
                        }
                    }
                ]
            },
            {
                test: reTsScript,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
            {
                test: reTsScript,
                loader: 'awesome-typescript-loader',
                include: path.resolve(__dirname, '..', 'src'),
            },
            {
                test: reStyle,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
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


