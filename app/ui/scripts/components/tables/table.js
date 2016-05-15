'use strict'

import React, { Component } from 'react'
import _ from 'lodash'
import { ui as UIUtils } from '../../utils'
import { Table } from 'react-bootstrap'
import TableHead from './head'

class TableComponent extends Component {
  render() {
    const {columns, rows, results, sort, title, parentRoute } = this.props
    return (
      <div className='container'>
        <div className='intro'>
          <div className='text'>
            <h2>{_.capitalize(title)}</h2>
          </div>
        </div>
        <Table className='table'>
          <thead>
            <tr>
              {columns.map(function(column) {
                return <TableHead key={column.key} column={column}
                  sort={sort} />
              })}
            </tr>
          </thead>
          <tbody>
            {UIUtils.makeTableBody(rows, results,
              {'route': title, 'sort': sort, 'columns': columns, 'parentRoute': parentRoute})}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default TableComponent
