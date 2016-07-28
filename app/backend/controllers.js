'use strict'

import Promise from 'bluebird'
import path from 'path'
import fs from 'fs'

Promise.promisifyAll(fs)

function makePage(filename, title) {
  return function(req, res) {
    var filepath = path.join(req.app.get('config').get('contentDir'), filename)
    var backend_config = req.app.get('config').get('backend')
    fs.readFileAsync(filepath, 'utf8')
      .then(function(content) {
        return res.render('page', {
          content: content,
          title: title,
          showPricing: backend_config['showPricing']
        })
      })
      .catch(console.trace.bind(console))
  }
}

function dashboard(req, res) {
  var backend_config = req.app.get('config').get('backend')
  return res.render('dashboard', {embed: false, showPricing: backend_config['showPricing']})
}

function embed(req, res) {
  return res.render('dashboard', {embed: true})
}

function api(req, res) {
  var db = req.app.get('cache').get('db')
  return res.json(db)
}

function pricing(req, res){
  var backend_config = req.app.get('config').get('backend')
  res.redirect(backend_config['pricingPageUrl'])
}

export default {
  about: makePage('about.md', 'About'),
  faq: makePage('faq.md', 'FAQ'),
  pricing,
  dashboard,
  embed,
  api
}
