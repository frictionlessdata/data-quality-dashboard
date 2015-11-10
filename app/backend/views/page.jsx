'use strict'

import React from 'react'
import marked from 'marked'
import DefaultView from './default'

let PageView = React.createClass({
  safe(content) {
    return { __html: marked(content) }
  },
  render() {
    const { instance, title, content } = this.props
    return (
      <DefaultView instance={instance}>
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
})

export default PageView
