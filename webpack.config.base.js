'use strict'
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:  './app/ui/scripts',
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel-loader' ], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')  }
    ]
  },
  output: { library: 'dq', libraryTarget: 'umd' }
}
