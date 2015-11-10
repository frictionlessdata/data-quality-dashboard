'use strict'

import React, { Component } from 'react'
import { Line as LineChart } from 'react-chartjs'
import { ui as UIUtils } from '../../utils'
import { calc as CalcUtils } from '../../utils'

class PublisherChart extends Component {
  render() {
    var linePayload = UIUtils.makeScoreLinePayload(
      this.props.results,
      this.props.performance
    )
    return (
      <section className='line-chart'>
        <div id='chartLegend'>{UIUtils.makeLegend()}</div>
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

export default PublisherChart
