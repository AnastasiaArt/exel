const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const filename = (ext) => isDev ? `bundle${ext}` : `bundle.[hash]${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill','./index.js'],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/',
        filename: filename('.js'),
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    devtool: isDev ? 'inline-source-map' : false,
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: !isDev,
            filename: filename('.html'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,'src/favicon.ico'),
                    to: path.resolve(__dirname,'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('.css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                    }
                }
            }
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: isDev,
        port: 3000,
        open: true,
    },
}
