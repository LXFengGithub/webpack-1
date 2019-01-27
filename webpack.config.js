
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  devServer: { /* 配置端口 */
    port: 3000,
    progress: true,
    contentBase: './build',
    compress: true
  },
  optimization: {
    minimizer: [  /* 优化项 */
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})  /* 压缩css */
    ]
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [   /* 插件配置 */
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: false
      },
      hash: true
    }),

    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module:{  /* 依赖项/模块 配置 */
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      }, {
        test: /\.less$/,
        use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
        ],
      }
    ]
  }
}