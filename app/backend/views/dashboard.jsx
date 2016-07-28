'use strict'

import React, { Component } from 'react'
import DefaultView from './default'

class DashboardView extends Component {
  render() {
    const { instance, embed, showPricing} = this.props
    return (
      <DefaultView instance={instance} embed={embed} showPricing={showPricing}>
        <section id='application'></section>
      </DefaultView>
    )
  }
}

export default DashboardView
