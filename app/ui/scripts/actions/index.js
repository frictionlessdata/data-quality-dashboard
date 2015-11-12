'use strict'

import 'isomorphic-fetch'
import _ from 'lodash'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const REQUEST_ACTIVE_PUBLISHER = 'REQUEST_ACTIVE_PUBLISHER'
export const RECEIVE_ACTIVE_PUBLISHER = 'RECEIVE_ACTIVE_PUBLISHER'

function requestData() {
  return {
    type: REQUEST_DATA,
    payload: null
  }
}

function receiveData(json) {
  return {
    type: RECEIVE_DATA,
    payload: json.data
  }
}

function requestActivePublisher() {
  return {
    type: REQUEST_ACTIVE_PUBLISHER,
    payload: null
  }
}

function receiveActivePublisher(data) {
  return {
    type: RECEIVE_ACTIVE_PUBLISHER,
    payload: data
  }
}

function fetchData(lookup) {
  return dispatch => {
    dispatch(requestData())
    let promises = fetch('/api')
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)))
    if (lookup) {
      promises = promises
      .then(data => dispatch(getActivePublisherIfNeeded(lookup)))
    }
    return promises
  }
}

function getActivePublisher(data, lookup) {
  return dispatch => {
    dispatch(requestActivePublisher())
    let activePublisher = _.find(data.publishers, { 'id': lookup })
    activePublisher.sources = _.filter(data.sources, { 'publisher_id': lookup })
    activePublisher.results = _.filter(data.results, { 'publisher_id': lookup })
    activePublisher.performance = _.filter(data.performance,
      { 'publisher_id': lookup })
    let newData = Object.assign({}, data, { activePublisher: activePublisher })
    return dispatch(receiveActivePublisher(newData))
  }
}

function shouldFetchData(state) {
  const { ui, data } = state
  if (data.isEmpty) {
    return true
  }
  if (ui.isFetching) {
    return false
  }
  return true
}

function shouldGetActivePublisher(data, lookup) {
  if (_.isEmpty(data.activePublisher)) {
    return true
  }
  if (data.activePublisher.id === lookup) {
    return false
  }
  return true
}

export function getActivePublisherIfNeeded(lookup) {
  return (dispatch, getState) => {
    const { data } = getState()
    if (shouldGetActivePublisher(data, lookup)) {
      return dispatch(getActivePublisher(data, lookup))
    }
  }
}

export function fetchDataIfNeeded(lookup) {
  return (dispatch, getState) => {
    const currentState = getState()
    let needData, needActivePublisher
    if (shouldFetchData(currentState)) {
      needData = true
    }
    if (shouldGetActivePublisher(currentState, lookup)) {
      needActivePublisher = true
    }
    if (needData && !needActivePublisher) {
      return dispatch(fetchData())
    }
    if (needActivePublisher && !needData) {
      return dispatch(getActivePublisher(currentState.data, lookup))
    }
    if (needData && needActivePublisher) {
      return dispatch(fetchData(lookup))
    }
  }
}
