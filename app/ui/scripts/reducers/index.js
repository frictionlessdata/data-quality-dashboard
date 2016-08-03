'use strict'

import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import { data as dataUtils } from '../utils'
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_ACTIVE_PUBLISHER,
  REQUEST_ACTIVE_PUBLISHER
} from '../actions'

function ui(state = {
  isFetching: false,
  tableHeaders: {
    main: [
      {key: 'title'},
      {key: 'type'},
      {key: 'homepage'},
      {key: 'email'},
      {key: 'completelyCorrect', label: 'Valid files',
      help: 'number of files with no errors at all'},
      {key: 'score', label: 'All-time Score'},
      {key: 'lastFileDate', label: 'last file'},
      {key: 'lastFileScore', label: 'Current Score', help: 'Average score (percent of correctness) for files published over the last three months'}
    ],
    publisher: [
      {key:'period', label:'period'},
      {key:'title'}, {key:'data', label:'URL'},
      {key:'format'},
      {key:'report', label:'Error details'},
      {key:'score'},
      {key:'schema'}
    ]
  },
  tableSorters: {
    main: [
      ['lastFileScore', 'desc'],
      ['title', 'asc']
    ],
    publisher: [
      ['period', 'desc'],
      ['score', 'desc']
    ]
  }
}, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case REQUEST_ACTIVE_PUBLISHER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false
      })
    case RECEIVE_ACTIVE_PUBLISHER:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function data(state = {
  isEmpty: true,
  instance: {},
  publishers: [],
  sources: [],
  results: [],
  runs: [],
  performance: [],
  activePublisher: {}
}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return Object.assign({}, state, action.payload, { isEmpty: false })
    case RECEIVE_ACTIVE_PUBLISHER:
      return Object.assign({}, state, action.payload, { isEmpty: false })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  router: routerStateReducer,
  ui,
  data
})

export default rootReducer
