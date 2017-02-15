var path = require('path');

var APP_DIR = path.join(__dirname, 'App');

var config = {
    context: APP_DIR,
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'built')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less']
    }
}

module.exports = config;