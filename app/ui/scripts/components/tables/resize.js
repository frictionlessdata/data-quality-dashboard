import React, { Component } from 'react'

class TableResize extends Component {
  render() {
    return (
      <span className='pull-right'>
        <a href='#'className='btn disabled'>Show less</a> |
        <a href='#'className='btn disabled'>Show more</a>
      </span>
    )
  }
}

export default TableResize
