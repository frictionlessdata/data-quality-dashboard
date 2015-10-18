'use strict';

var Promise = require('bluebird');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));

function makePage(filename) {
  return function(req, res) {
    var filepath = path.join(req.app.get('config').get('contentDir'), filename);
    fs.readFileAsync(filepath, 'utf8')
      .then(function(content) {
        return res.render('page', {
          content: content
        });
      })
      .catch(console.trace.bind(console));
  };
}

function dashboard(req, res) {
  return res.render('dashboard');
}

function api(req, res) {
  var db = req.app.get('db');
  return res.json(db);
}

module.exports = {
  about: makePage('about.md'),
  faq: makePage('faq.md'),
  pricing: makePage('pricing.md'),
  dashboard: dashboard,
  api: api
};
