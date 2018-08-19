const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

module.exports = require('./webpack.config.base.js')({
    mode: 'production',

    entry: path.join(__dirname, '..', 'src', 'index.js'),

    output: {
        filename: 'index.min.js',
    },

    optimization: {
        minimize: true,
        nodeEnv: 'production',
        sideEffects: true,
        concatenateModules: true,
        // splitChunks: { chunks: 'all' },
        runtimeChunk: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),

        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        })
    ],

    performance: {
        assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
    },
});