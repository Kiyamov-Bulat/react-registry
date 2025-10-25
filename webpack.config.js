const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src/demo'),
    mode: 'development',
    entry: './index.tsx',

    output: {
        path: path.resolve(__dirname, 'dev_dist'),
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react', { runtime: 'automatic' }],
                            '@babel/preset-typescript',
                        ],
                        plugins: ['react-refresh/babel'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            esModule: false,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/inline',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new ReactRefreshWebpackPlugin(),
    ],

    devServer: {
        static: './public',
        port: 3000,
        open: true,
        hot: true,
    },

    devtool: 'eval-source-map',
};
