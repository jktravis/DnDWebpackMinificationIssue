const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const GLOBALS = {
  APP_VERSION: JSON.stringify(require("./package.json").version)
};

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './index.js',
  },
  target: 'web',
  output: {
    path: __dirname + '/build', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: './',
    filename: '[name].js'
  },
  stats: "minimal",
  devServer: {
    contentBase: './'
  },
  plugins: [
    new AssetsPlugin({
      filename: 'webpack.assets.json',
      path: './build',
      prettyPrint: true
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    }),
    // allows for global variables
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new Visualizer()
  ],
  module: {
    rules: [
      // {test: /\.js$/, enforce: "pre", use: 'eslint-loader' },
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract(
          { fallback: 'style-loader', use: 'css-loader' }
        )
      },
      {
        test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract(
          { fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }
        )
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?-loaderprefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpg|png)$/, use: 'file-loader' }
    ]
  }
};
