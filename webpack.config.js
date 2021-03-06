const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", './src/main/js/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'src/main/webapp/resources/static/js'),
        filename: 'index.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
        ]
    },
};