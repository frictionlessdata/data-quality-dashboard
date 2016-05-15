'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ReduxRouter } from 'redux-router'
import configureStore from '../store/configureStore'
import Main from './Main'
import Publisher from './Publisher'
import Embed from './Embed'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            <Route path='publishers/:lookup' component={Publisher} />
            <Route path='/' component={Main} />
            <Route path="embed" component={Embed}/>
            <Route path="embed/publishers/:lookup" component={Publisher} />
          </ReduxRouter>
        </Provider>
      </div>
    )
  }
}

export default App
