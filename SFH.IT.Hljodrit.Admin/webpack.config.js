var path = require('path');

var APP_DIR = path.join(__dirname, 'App');

var config = {
    context: APP_DIR,
    entry: ['babel-polyfill', './main.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'built')
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less']
    }
}

module.exports = config;