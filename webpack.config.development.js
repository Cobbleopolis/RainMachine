var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
    entry: [
        'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
        './src/js/index',
        'script!jquery'
    ],
    devtool: 'eval',
    cache: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.s(a|c)ss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.png|\.svg$/,
                loaders: ['file-loader']
            }
        ]
    },
    output: {
        path: __dirname + '/app',
        publicPath: 'http://localhost:9000/app/',
        filename: 'js/app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;