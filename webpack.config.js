const path = require('path');
const dist = path.resolve('./dist');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        'autocomplete.js': './assets/components/autocomplete/autocomplete.js',
        '': 'webpack-hot-middleware/client'
    },
    output: {
        path: path.resolve(dist, 'js/autocomplete/'),
        filename: '[name]'
    },

    module: {
        rules: [],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
