const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = merge( common, {
    mode: 'production',
    output: {
      filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, "dist"),
      },  
    plugins: [
        new CleanWebpackPlugin(),  
    ],
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
      }
});
