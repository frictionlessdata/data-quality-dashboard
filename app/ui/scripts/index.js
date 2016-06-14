'use strict'

// for webpack to build our css
require('../styles/app.scss')

import 'babel-polyfill'
import React from 'react'
import Chart from 'chart.js'
import { render } from 'react-dom'
import App from './containers/App'

render(
  <App />,
  document.getElementById('application')
)
