const path = require('path')
const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'
let plugins = []
if(isProduction) {
    plugins.push(
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        })        
    )
}
module.exports = {
    entry: {
        index: [
            'babel-polyfill',
            './src/index.js',
        ],
        edit: [
            'babel-polyfill',
            './src/edit.js',            
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    plugins: plugins,
    module: {
        rules: 
        [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
            test: /\.scss$/,
            exclude: /node_modules/, 
            use: [
                'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
            ]
        }, { 
            test: /\.css$/, 
            use: [
                'style-loader', 'css-loader', 'postcss-loader'
            ] 
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}
