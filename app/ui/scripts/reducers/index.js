'use strict'

import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import { REQUEST_DATA, RECEIVE_DATA } from '../actions'

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
      {key:'schema', label:'Error details'},
      {key:'score'}
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
        isFetching: true,
      })
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
      })
    default:
      return state
  }
}

function data(state = {
  instance: {},
  publishers: [],
  sources: [],
  results: [],
  runs: [],
  performance: [],
  activePublisher: {},
  activeSource: {}
}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        instance: action.payload.instance,
        publishers: action.payload.publishers,
        sources: action.payload.sources,
        results: action.payload.results,
        runs: action.payload.runs,
        performance: action.payload.performance,
      })
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
