'use strict'
const path = require('path');

module.exports = {
    entry: {
        init: './src/init.js',
        select: './src/select.js',
        '/popup/popup': './src/popup/popup.js',
        '/options/options': './src/options/options.js',
        '/display/display': './src/display/display.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertInto: () => document.querySelector("body")
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
};