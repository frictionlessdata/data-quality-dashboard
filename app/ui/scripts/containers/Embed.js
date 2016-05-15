'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectPublisher, fetchDataIfNeeded } from '../actions'
import { Table } from '../components/tables'
import { Main as Overview } from '../components/overviews'

class Embed extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded())
  }
  render() {
    const { ui, data, route } = this.props
    return (
      <div>
      {ui.isFetching &&
        <div className='is-fetching'>
          <div>Loading data..</div>
        </div>
      }
      {!ui.isFetching &&
        <div>
          <div className='dashboard'>
            <div className='jumbotron'>
              <Overview instance={data.instance}
                results={data.results} publishers={data.publishers} />
            </div>
            <div className='container'></div>
            <section className='publishers'>
              <Table title={'publishers'} rows={data.publishers}
                results={data.results} columns={ui.tableHeaders.main}
                sort={ui.tableSorters.main} parentRoute={route.path} />
            </section>
          </div>
        </div>
      }
    </div>
    )
  }
}

Embed.propTypes = {
  data: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { ui, data } = state
  return { ui, data }
}

export default connect(mapStateToProps)(Embed)
