'use strict'

var path = require('path');

module.exports = {
  entry: "./app/ui/scripts",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "app.min.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
}
