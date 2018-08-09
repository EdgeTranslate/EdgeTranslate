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
    devtool: 'inline-source-map', // 在开发环境下生成.map文件，便于定位到源代码的位置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};