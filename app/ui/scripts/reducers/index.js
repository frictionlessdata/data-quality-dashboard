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
      {key: 'completelyCorrect', label: 'Correct',
      help: 'number of files with no errors at all'},
      {key: 'score', label: 'score (all time)'},
      {key: 'lastFileDate', label: 'last file'},
      {key: 'lastFileScore', label: 'score', help: '% correct (no errors)'}
    ],
    publisher: [
      {key:'period_id', label:'period'},
      {key:'title'}, {key:'data', label:'URL'},
      {key:'format'},
      {key:'report', label:'Error details'},
      {key:'score'},
      {key:'schema'}
    ]
  },
  tableSorters: {
    main: [
      ['lastFileScore', false],
      ['title', true]
    ],
    publisher: [
      ['periodTimestamp', false],
      ['score', false]
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
