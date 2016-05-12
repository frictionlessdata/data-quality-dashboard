'use strict'

module.exports = {
  entry:  './app/ui/scripts',
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel-loader' ], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  output: { library: 'dq', libraryTarget: 'umd' }
}
