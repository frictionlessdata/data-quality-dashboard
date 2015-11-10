'use strict'

import _ from 'lodash'
import path from 'path'
import nconf from 'nconf'
import utils from './utils'

nconf.file({
  file: path.join(path.dirname(__dirname), 'settings.json')
})

nconf.defaults({
  port: process.env.PORT || 3000,
  backend: utils.getBackend(),
  cacheData: process.env.CACHE_DATA || true,
  contentDir: process.env.CONTENT_DIR || path.join(__dirname, 'content')
})

export default nconf
