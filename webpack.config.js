const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
        clean: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    devtool: isDev ? "source-map" : false,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new ESLintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('fonts', '[name][ext]'),
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name].[contenthash][ext]'),
                },
            },
        ],
    },
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            ['svgo', { name: 'preset-default' }],
                        ],
                    },
                },
            }),
        ],
    },
};