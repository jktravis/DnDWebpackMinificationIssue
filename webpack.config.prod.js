const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  APP_VERSION: JSON.stringify(require("./package.json").version),
};

module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    main: './index.js',
  },
  target: 'web',
  output: {
    path: __dirname + '/build', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: './',
    filename: '[name].js',
  },
  stats: "minimal",
  devServer: {
    contentBase: './',
  },
  optimization: {
    /**
     * Minification is causing react-dnd to choke
     * Disable for now
     */
    minimize: true,
  },
  plugins: [
    new AssetsPlugin({
      filename: 'webpack.assets.json',
      path: './build',
      prettyPrint: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  module: {
    rules: [
      // {test: /\.js$/, enforce: "pre", use: 'eslint-loader' },
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract(
          { fallback: 'style-loader', use: 'css-loader' },
        ),
      },
      {
        test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract(
          { fallback: 'style-loader', use: ['css-loader', 'sass-loader'] },
        ),
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?-loaderprefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpg|png)$/, use: 'file-loader' },
    ],
  },
};
