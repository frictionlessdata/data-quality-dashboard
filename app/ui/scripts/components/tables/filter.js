'use strict'

import React, { Component } from 'react'
import { Input } from 'react-bootstrap'
import { ui as UIUtils } from '../../utils'

class TableFilter extends Component {
  render() {
    return (
      <Input
        disabled
        type='text'
        placeholder='Filter by keywords'
        ref='input'
        onChange={UIUtils.filterTable()}
      />
    )
  }
}

export default TableFilter
