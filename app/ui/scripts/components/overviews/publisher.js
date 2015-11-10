'use strict'

import React, { Component } from 'react'
import { ui as UIUtils } from '../../utils'

class PublisherOverview extends Component {
  render() {
    const { publisher, results } = this.props
    return (
      <div className='container'>
        <h2>{publisher.title}</h2>
        <ul className='overview'>
          {UIUtils.makeOverview(results, [], 'publisher')}
        </ul>
      </div>
    )
  }
}

export default PublisherOverview
