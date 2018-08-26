const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.entry.publicPath,
    quiet: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(8082);

console.log('----- 服务正在运行，访问地址: http://localhost:8082 -----');
console.log('---------------------------------------------------------')
