'use strict';

import React from 'react';
import DefaultView from './default';

let DashboardView = React.createClass({
  render() {
    const { instance } = this.props;
    return (
      <DefaultView instance={instance}>
        <section id='application'></section>
      </DefaultView>
    );
  }
});

export default DashboardView;
