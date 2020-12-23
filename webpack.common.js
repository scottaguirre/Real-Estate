const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");
const webpack = require('webpack');


module.exports = {
    entry: {
        index: './src/index.js'
    },
    module: {
        rules: [
            // JavaScript Loader
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            // SASS Files loaders
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader", /*convert css into js */
                  "postcss-loader",
                  "sass-loader"
                ],
              },
            //   {
            //     test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            //     loader: "url-loader",
            //     options: {
            //       limit: 8192,
            //     },
            //   },

            // Pug loader
            {
                test: /\.pug$/,             
                use: [
                    'html-loader', 
                    'pug-html-loader?{"pretty":true,"exports":false}'
                ]
            }
        ]
    },
    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ImageminPlugin({
            externalImages: {
              sources: glob.sync("src/images/**/*.{png,jpg,jpeg,gif,svg}"),
              context: "./",
              destination: "dist/images",
              fileName:"[name].[ext]",
            }
          }), 
        
        // This plugin will generate the CSS files with input name in the dist folder
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: "[id].css"
        }),
        // This plugin will generate the html file for the index.pug file in the dist folder
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/views/pages/index.pug'
        }),
        // This plugin will generate the html file for the index.pug file in the dist folder
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: 'src/views/pages/about.pug'
        }),
        // This plugin will generate the html file for the index.pug file in the dist folder
        new HtmlWebpackPlugin({
            filename: 'contact.html',
            template: 'src/views/pages/contact.pug'
        })
    ]
}