'use strict'

import React, { Component } from 'react'
import { Line as LineChart } from 'react-chartjs'
import { ui as UIUtils } from '../../utils'
import { calc as CalcUtils } from '../../utils'

class SourceChart extends Component {
  render() {
    var linePayload = UIUtils.makeScoreLinePayload(this.props.results)
    return (
      <section className='line-chart'>
        <div className='intro'>
          <div className='text'>
            <h2>{this.props.source.title} ({this.props.publisher.title})</h2>
            <p></p>
          </div>
          <div className='more'>
            <a className='btn btn-default' href='#' role='button'>More</a>
          </div>
        </div>
        <LineChart
          id='lineChart'
          data={linePayload.data}
          options={linePayload.options}
          width={1140}
          height={300}
        />
        </section>
    )
  }
}

export default SourceChart
