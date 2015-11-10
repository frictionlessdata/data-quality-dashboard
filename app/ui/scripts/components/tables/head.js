'use strict'

import React, { Component } from 'react'
var _ = require('lodash')
var Popover = require('react-bootstrap').Popover
var OverlayTrigger = require('react-bootstrap').OverlayTrigger

class TableHead extends Component {
  onClick(e) {
    // this.props.sort(this.props.column.key)
  }
  render() {
    const { key, column, sort } = this.props
    let tooltip = ''
    if (column.help) {
      tooltip = (
        <OverlayTrigger
          trigger='click'
          placement='top'
          overlay={<Popover>{_.capitalize(column.help)}</Popover>}
        >
          <span className='glyphicon glyphicon-question-sign'></span>
        </OverlayTrigger>
      )
    }
    return (
      <th>
        <span onClick={this.onClick}>
          {_.capitalize(column.label || column.key)}
        </span> {tooltip}
      </th>
    )
  }
}

export default TableHead
