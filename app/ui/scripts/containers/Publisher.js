'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getActivePublisherIfNeeded, fetchDataIfNeeded } from '../actions'
import { Table } from '../components/tables'
import { Publisher as Overview } from '../components/overviews'
import { Publisher as Chart } from '../components/charts'

class Publisher extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    const lookup = this.props.params.lookup
    dispatch(fetchDataIfNeeded(lookup))
  }
  render() {
    const { ui, data } = this.props
    const activePublisher = data.activePublisher
    return (
      <div>
      {ui.isFetching &&
        <div className='is-fetching'>
          <div>Loading data..</div>
        </div>
      }
      {!ui.isFetching &&
        <div>
          <div className="dashboard">
            <div className="jumbotron">
              <Overview publisher={activePublisher}
                results={activePublisher.results} />
            </div>
            <div className="container">
              <Chart results={activePublisher.results} publisher={activePublisher}
                performance={activePublisher.performance} />
            </div>
            <section className="publishers">
              <Table title={'data files'} rows={activePublisher.sources}
                results={activePublisher.results}
                columns={ui.tableHeaders.publisher}
                sort={ui.tableSorters.publisher} />
            </section>
          </div>
        </div>
      }
      </div>
    )
  }
}

Publisher.propTypes = {
  data: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { ui, data } = state
  return { ui, data }
}

export default connect(mapStateToProps)(Publisher)
