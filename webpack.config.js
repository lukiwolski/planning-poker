const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/client/index.js',
  ],

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ] : [],

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
};
