'use strict'

import React, { Component } from 'react'
import { ui as UIUtils } from '../../utils'

class MainOverview extends Component {
  render() {
    const { instance, publishers, results } = this.props
    return (
      <div className='container'>
        <h2>{instance.name}</h2>
        <p>
          How are government departments living up to their commitments to
          publish timely, high quality data on spending?
        </p>
        <ul className='overview'>
          {UIUtils.makeOverview(results, publishers, 'main')}
        </ul>
      </div>
    )
  }
}

export default MainOverview
