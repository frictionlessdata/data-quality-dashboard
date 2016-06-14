'use strict'

var _ = require('lodash')
var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var developmentConfig = {
  output: {
    filename: 'scripts/app.js',
    path: './public'
  },
  plugins:  [
    new ExtractTextPlugin('styles/app.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}

var config = _.merge({}, baseConfig, developmentConfig)

module.exports = config
