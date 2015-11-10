'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectPublisher, fetchDataIfNeeded } from '../actions'
import { Table } from '../components/tables'
import { Publisher as Overview } from '../components/overviews'
import { Publisher as Chart } from '../components/charts'

class Publisher extends Component {
  componentDidMount() {
    const { dispatch, data } = this.props
    dispatch(fetchDataIfNeeded())
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    const { ui, data } = this.props
    return (
      <div>
      {data.isFetching &&
        <div className='is-fetching'>
          <div className='glyphicon glyphicon-off'></div>
        </div>
      }
      {!data.isFetching &&
        <div>
          <div className="dashboard">
            <div className="jumbotron">
              <Overview publisher={data.activePublisher}
                results={data.results} />
            </div>
            <div className="container">
              <Chart results={data.results} publisher={data.activePublisher}
                performance={data.performance} />
            </div>
            <section className="publishers">
              <Table title={'data files'} rows={data.sources}
                results={data.results}
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
