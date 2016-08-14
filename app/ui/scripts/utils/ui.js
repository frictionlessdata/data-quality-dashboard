'use strict'

import React from 'react'
import _ from 'lodash'
import { Popover } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router'
import CalcUtils from './calc'
import moment from 'moment'

function searchIn(objects, field, query) {
  let lookup = _.map(objects, field)
  let matches = _.filter(lookup, function(candidate) {
    return candidate.toLowerCase().indexOf(query.toLowerCase()) > -1
  })
  return matches
}

function makeOverviewNumber(number, digitWidth) {
  let spans = []
  let spanStyle = {
    width: Math.floor(digitWidth) + 'px',
    height: Math.floor(1.6 * digitWidth) + 'px',
    fontSize: Math.floor(1.425 * digitWidth) + 'px',
    lineHeight: Math.floor(1.55 * digitWidth) + 'px'
  }
  _.forEach(number, function(c) {
    spans.push(<span style={spanStyle}>{c}</span>)
  })
  return spans
}

function makeOverviewCounter(label, number, help, counterPadding, digitWidth) {
  let counterStyle
  let tooltip = ''
  if (counterPadding > 0) {
    let digitCount = number.length
    let counterWidth = (digitCount * (digitWidth + 6)) + (2 * counterPadding)
    counterStyle = {
      width: counterWidth + 'px',
      paddingLeft: counterPadding + 'px',
      paddingRight: counterPadding + 'px'
    }
  } else {
    counterStyle = {
      width: '100%',
      paddingLeft: '0',
      paddingRight: '0'
    }
  }
  if (help) {
    tooltip = (
      <OverlayTrigger trigger="click" placement="top" overlay={<Popover>{_.capitalize(help)}</Popover>}>
        <span className="small glyphicon glyphicon-question-sign"></span>
      </OverlayTrigger>
    )
  }
  return <li className="counter" style={counterStyle}><span className="value">
    {makeOverviewNumber(number, digitWidth)}</span>
    <span className="label">{label} {tooltip}</span></li>
}

function makeOverview(results, objects, page) {
  let documentWidth = document.body.clientWidth
  let availableWidth = 0
  let counters = []
  let digitMargins = 6
  let digitCount = 0
  let values, allDigitWidth, spacePerDigit, digitMaxWidth, digitWidth,
  counterPadding
  let latestResults = CalcUtils.latestResults(results)
  let recents = CalcUtils.recentPeriodResults(latestResults)
  if (page === 'main') {
    values = {
      validPercent: {
        label: 'valid (%)',
        help: 'percentage of valid files (no errors) published over the last three months',
        value: CalcUtils.validPercent(recents) + ''
      },
      totalScore: {
        label: 'score (%)',
        help: 'average score (percent of correctness) for files published over the last three months',
        value: CalcUtils.totalScore(recents, CalcUtils.publisherCount(objects), 3) + ''
      },
      publisherCount: {
        label: 'publishers',
        value: CalcUtils.publisherCount(objects) + ''
      },
      sourceCount: {
        label: 'data files',
        value: latestResults.length + ''
      }
    }
  } else if (page === 'publisher') {
    values = {
      totalScore: {
        label: 'score (%)',
        help: 'average % correct (no errors) published over the last three months',
        value: CalcUtils.totalScore(recents, 1, 3) + ''
      },
      validPercent: {
        label: 'correct (%)',
        help: 'percentage of valid files (rounded) published over the last three months',
        value: CalcUtils.validPercent(recents) + ''
      },
      sourceCount: {
        label: 'data files',
        value: latestResults.length + ''
      }
    }
  }

  if (documentWidth >= 980 && documentWidth < 1180) {
    availableWidth = 980
  } else if (documentWidth >= 1180) {
    availableWidth = 1180
  }

  if (availableWidth > 0) {
    _.forEach(values, function(obj) {
      digitCount += obj.value.length
    })
    spacePerDigit = availableWidth / (digitCount + 4)
    digitMaxWidth = spacePerDigit - digitMargins
    digitWidth = digitMaxWidth >= 80 ? 80 : digitMaxWidth
    allDigitWidth = digitCount * (digitWidth + digitMargins)
    counterPadding = (availableWidth - allDigitWidth) / 8
    _.forEach(values, function(obj) {
      counters.push(makeOverviewCounter(obj.label, obj.value, obj.help, counterPadding, digitWidth))
    })
  } else {
    _.forEach(values, function(obj) {
      digitCount = obj.value.length
      spacePerDigit = documentWidth / (digitCount + 2)
      digitMaxWidth = spacePerDigit - digitMargins
      digitWidth = digitMaxWidth >= 80 ? 80 : digitMaxWidth
      allDigitWidth = digitCount * (digitWidth + digitMargins)
      counterPadding = 0
      counters.push(makeOverviewCounter(obj.label, obj.value, obj.help, counterPadding, digitWidth))
    })
  }

  return counters
}

function makeTableBody(objects, results, options) {
  let _body = []
  let _unsorted = []
  let latestResults = CalcUtils.latestResults(results)

  if (options.route === 'publishers') {
    // for each publisher, get its score from results and return a new array of publishers with scores
    _unsorted = _.map(objects, function(obj) {
      let _publisherScore = CalcUtils.publisherScore(obj.id, latestResults)
      let _lastFile = CalcUtils.lastFile(obj.id, latestResults)
      let _objWithScore = _.cloneDeep(obj)
      _objWithScore.completelyCorrect = _publisherScore.amountCorrect
      _objWithScore.score = _publisherScore.score
      _objWithScore.lastFileDate = _lastFile.period
      _objWithScore.lastFileScore = _lastFile.score
      return _objWithScore
    })
  } else if (options.route === 'data files') {
    // for each source, get its score and timestamp from results and return a new array of sources with scores and timestamps
    _unsorted = _.map(objects, function(obj) {
      let _sourceData = CalcUtils.sourceData(obj.id, latestResults)
      let _objWithScore = _.cloneDeep(obj)
      _objWithScore.score = _sourceData.score
      _objWithScore.timestamp = _sourceData.timestamp
      _objWithScore.period = _sourceData.publicationDate
      return _objWithScore
    })
  }

  // sort
  let sorters = _.unzip(options.sort)
  _body = _.orderBy(_unsorted, sorters[0], sorters[1])
  // for each data item, return a table row
  _body = _.map(_body, function(obj) {
    return <tr key={obj.id}>{makeTableRow(obj, options, options.route)}</tr>
  })
  return _body
}

function formatCell(key, value, obj, options) {
  let _cell
  let _c
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December']

  switch (key) {
    case "title":
      if (options.route) {
        let path = (options.parentRoute == '/' ? '' : options.parentRoute)
        _cell = <td key={key}><Link to={`${path}/${options.route}/${obj.id}`}>{value}</Link></td>
      } else {
        _cell = <td key={key}>{value}</td>
      }
      break
    case 'homepage':
      _cell = <td key={key}><a href={value}><span className="glyphicon glyphicon-link" aria-hidden="true"></span></a></td>
      break
    case 'email':
      if (value) {
        _cell = <td key={key}><a href={'mailto:' + value}><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></a></td>
      } else {
        _cell = <td key={key}><span className="glyphicon glyphicon-envelope text-muted" aria-hidden="true"></span></td>
      }
      break
    case 'score':
    case 'lastFileScore':
      if (value == 0) {
        _c = 'danger'
      } else if (value >= 1 && value <= 20) {
        _c = 'score-20p'
      } else if (value >= 21 && value <= 40) {
        _c = 'score-40p'
      } else if (value >= 41 && value <= 60) {
        _c = 'score-60p'
      } else if (value >= 61 && value <= 80) {
        _c = 'score-80p'
      } else if (value >= 81 && value <= 99) {
        _c = 'score-99p'
      } else {
        _c = 'success'
      }
      _cell = <td key={key} className={'score ' + _c}>{value + ' %'}</td>
      break
    case 'lastFileDate':
      let displayed_period = 'No publications'
      let today = new Date()
      let three_months_ago = new Date(today.getFullYear(), today.getMonth()-3)
      let one_year_ago = new Date(today.getFullYear()-1, today.getMonth())
      _c = 'danger'
      if (value) {
        let date = new Date(value)
        let month = months[date.getMonth()]
        let year = date.getFullYear()
        if (date > three_months_ago) {
          _c = 'success'
        } else if (date > one_year_ago) {
          _c = 'warning'
        }
        displayed_period = month + ' ' + year
      }
      _cell = <td key={key} className={'date ' + _c}>{displayed_period}</td>
      break
    case 'type':
      _cell = <td key={key}>{value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}</td>
      break
    case 'data':
      if (value) {
        let data_file_name = _.last(value.split('/'))
        _cell = <td key={key}><a href={value}>{data_file_name}</a></td>
      } else {
        _cell = <td key={key}></td>
      }
      break
    case 'period':
      if (value) {
        let month = months[value.getMonth()]
        let year = value.getFullYear()
        let displayed_period = month + ' ' + year
        _cell = <td key={key}>{displayed_period}</td>
      } else {
        _cell = <td key={key}>{}</td>
      }
      break
    case 'report':
      if (!obj.schema) { obj.schema = ''}
      _cell = <td key="report"><a href={'http://goodtables.okfnlabs.org/reports?data_url=' + obj.data + '&format=' + obj.format + '&encoding=&schema_url=' + obj.schema}>{'Details'}</a></td>
      break
    case 'schema':
      if (value) {
        _cell = <td key={key}><a href={value}>See schema</a></td>
      } else {
        _cell = <td key={key}>Schema unavailable</td>
      }
      break
    default:
      _cell = <td key={key}>{value}</td>
  }
    return _cell
}

function makeTableRow(obj, options, table) {
  let _row = []
  let _cell
  if (table === 'publishers') {
    _.forEach(options.columns, function(column) {
      _cell = formatCell(column.key, obj[column.key], obj, options)
      if (_cell) { _row.push(_cell) }
	   })
  } else if (table === 'data files') {
    _.forEach(options.columns, function(column) {
      _cell = formatCell(column.key, obj[column.key], obj, {})
      if (_cell) { _row.push(_cell) }
    })
  }
  return _row
}

function makeLabel(timestamp) {
  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth()
  let abbr_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec']
  return abbr_months[month] + ' ' + year
}

function makeChartData(performance) {
  let performances = []
  let data = {}
  let scores = []
  let valids = []
  let labels = []
  let _sorted = []

  // get performances
  _.forEach(performance, function(obj) {
    let dateParts = obj.month_of_creation.split('-')
    let date = new Date(parseInt(dateParts[0], 10),
    parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10))
    performances.push({creation_id: obj.month_of_creation, timestamp: date.getTime(),
      score: obj.score, valid: obj.valid})
  })

  // sort performances by period
  _sorted = _.sortBy(performances, 'timestamp')
  _.forEach(_sorted, function(obj) {
    scores.push(obj.score)
    valids.push(obj.valid)
    labels.push(makeLabel(obj.timestamp))
  })
  data = {scores: scores, valids: valids, labels: labels}
  return data
}

function makeScoreLinePayload(results, performance) {
  let chartData = makeChartData(performance)
  let scores = chartData.scores
  let valids = chartData.valids
  let labels = chartData.labels
  let data = {
    labels: labels,
    datasets: [
      {
        label: "Score",
        fillColor: "rgba(122, 184, 0,0.2)",
        strokeColor: "rgba(122, 184, 0,1)",
        pointColor: "rgba(122, 184, 0,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(122, 184, 0,1)",
        data: scores
      },
      {
        label: "Correct",
        fillColor: "rgba(119,119,119,0.2)",
        strokeColor: "rgba(119,119,119,1)",
        pointColor: "rgba(119,119,119,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(119,119,119,1)",
        data: valids
      }
    ]
  }

  let options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 2,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : false,
    scaleLabel: '<%=value%> %',
    scaleOverride: true,
    scaleSteps: 10,
    scaleStepWidth: 10,
    scaleStartValue: 0,
    animation: false,
    multiTooltipTemplate: '<%= datasetLabel %>: <%= value %> %'
  }

  return {
    data: data,
    options: options
  }
}

function makeLegend() {
  let ulStyle = {
    listStyleType: 'none',
    'float': 'right'
  }
  let liStyle = {
    display: 'inline-block',
    marginRight: '10px'
  }
  let colorStyle = {
    display: 'inline-block',
    width: '22px',
    height: '13px',
    marginRight: '5px'
  }
  let scoreColStyle = _.cloneDeep(colorStyle)
  let validColStyle = _.cloneDeep(colorStyle)
  scoreColStyle.backgroundColor = 'rgba(122, 184, 0,1)'
  validColStyle.backgroundColor = 'rgba(119,119,119,1)'
  let textStyle = {
    verticalAlign: 'top',
    fontSize: '13px'
  }
  let score = <li style={liStyle}><span style={scoreColStyle}></span>
  <span style={textStyle}>{'Score (%)'}</span></li>
  let valid = <li style={liStyle}><span style={validColStyle}></span>
  <span style={textStyle}>{'Correct (%)'}</span></li>
  let legend = (
    <ul style={ulStyle}>
      {score}
      {valid}
    </ul>
  )
  return legend
}

export default {
    makeOverviewNumber,
    makeOverview,
    makeTableBody,
    makeScoreLinePayload,
    searchIn,
    makeLegend
}
