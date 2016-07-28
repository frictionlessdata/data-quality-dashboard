'use strict'

import React, { Component } from 'react'
import marked from 'marked'
import DefaultView from './default'

class PageView extends Component {
  safe(content) {
    return { __html: marked(content) }
  }
  render() {
    const { instance, title, content, showPricing } = this.props
    return (
      <DefaultView instance={instance} showPricing={showPricing}>
        <div className='jumbotron inverse'>
          <div className='container'>
            <h1>{title}</h1>
          </div>
        </div>
        <div className='container'>
          <div dangerouslySetInnerHTML={this.safe(content)} />
        </div>
      </DefaultView>
    )
  }
}

export default PageView
