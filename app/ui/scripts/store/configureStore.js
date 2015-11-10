'use strict'

import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { reduxReactRouter } from 'redux-router'
import { createHistory } from 'history'
import rootReducer from '../reducers'

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  ),
  reduxReactRouter({ createHistory })
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
