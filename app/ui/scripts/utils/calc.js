'use strict'

import _ from 'lodash'
import moment from 'moment'

function publisherCount(publishers) {
  return _.uniqBy(publishers, 'id').length
}

function recentPeriodResults(results) {
  let today = new Date()
  let three_months_ago = new Date(today.getFullYear(), today.getMonth()-3)
  let recentPeriodOnly = []

  if (results.length > 0) {
    recentPeriodOnly = _.filter(results, function(obj) {
      return moment(obj.created_at, 'YYYY-MM-DD', true).toDate() > three_months_ago
    })
  }
  return recentPeriodOnly
}

function validPercent(results) {
  let validPercent = 0
  let valid = _.filter(results, function(obj) {
    let score = obj.score ? parseInt(obj.score) : 0
    if (score == 100) {
      return obj
    }
  })
  if (results.length > 0) {
    validPercent = Math.round((valid.length / results.length) * 100)
  }
  return validPercent
}

function totalScore(results, numberOfPublishers, numberOfTimeUnits) {
  let scores = []
  let score = 0
  let expectedResults = numberOfPublishers * numberOfTimeUnits
  _.forEach(results, function(obj) {
   scores.push(parseInt(obj.score))
  })
  if (scores.length > 0) {
    let sumScores =  _.reduce(scores, function(sum, n) {return sum + n})
    if (scores.length > expectedResults) { expectedResults = scores.length }
    score = Math.round(sumScores / expectedResults)
  }
  return score
}

function publisherScore(publisher, results) {
  let scores = []
  let countCorrect = 0
  let publisherScore = 0

  // get all scores for this publisher from results
  _.forEach(results, function(obj) {
    if (obj.publisher_id === publisher) {
      let score = obj.score ? parseInt(obj.score) : 0
      scores.push(score)
      if (score === 100) {
        countCorrect += 1
      }
    }
  })
  // set the publisher score to: sum of scores / number of scores
  if (scores.length > 0) {
    publisherScore = Math.round(_.reduce(scores, function(sum, n) {return sum + n}) / scores.length)
  }
  return {'score': publisherScore, 'amountCorrect': countCorrect}
}

// return last publication date for a give publisher
function lastFile(publisher, results) {

  let publisherFiles = _.filter(results, function(obj) {
    return obj.publisher_id === publisher
  })
  let publication =  _.maxBy(publisherFiles, function(obj) {
    return  moment(obj.created_at, 'YYYY-MM-DD', true).utc().toDate()
  })

  let lastFile = {period: 0, score: 0}
  if (publication) {
      lastFile.period = moment(publication.created_at, 'YYYY-MM-DD', true).utc().toDate()
      lastFile.score = parseInt(publication.score)
  }
  return lastFile
}

// return the data for a source
function sourceData(source, results) {
  let sourceData = {score: 0, timestamp: 0, publicationDate: 0}
  let matchingSource = _.find(results, _.matchesProperty('source_id', source))
  if (_.isUndefined(matchingSource) === false) {
    sourceData.score = matchingSource.score ? parseInt(matchingSource.score) : 0
    sourceData.timestamp = Date.parse(matchingSource.timestamp)
    sourceData.publicationDate = moment(matchingSource.created_at, 'YYYY-MM-DD', true).utc().toDate()
  }
  return sourceData
}

// return the latest results for all sources
function latestResults(results) {
  return _.chain(results)
          .orderBy(function(obj) {return Date.parse(obj.timestamp)}, ['desc'])
          .uniqBy(function (e) { return e.source_id })
          .value()
}

export default {
  publisherCount,
  recentPeriodResults,
  validPercent,
  totalScore,
  publisherScore,
  sourceData,
  lastFile,
  latestResults
}
