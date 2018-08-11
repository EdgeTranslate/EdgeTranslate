'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');

module.exports = merge(baseWebpackConfig, {
    devtool: 'inline-source-map'
})
