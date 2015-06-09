var React = require('react');
var Router = require('react-router');
var InstanceStore = require('../../stores/instanceStore');
var PublisherStore = require('../../stores/publisherStore');
var SourceStore = require('../../stores/sourceStore');
var ResultStore = require('../../stores/resultStore');
var RunStore = require('../../stores/runStore');
var PerformanceStore = require('../../stores/performanceStore');
var HeaderPanel = require('../panels/Header.react');
var FooterPanel = require('../panels/Footer.react');
var PublisherChart = require('../charts/PublisherChart.react');
var PublisherOverview = require('../PublisherOverview.react');
var SortableTable = require('../tables/SortableTable.react');
var APIUtils = require('../../utils/APIUtils');
var Mixins = require('./Mixins.react');


function getStateFromStores(getParams) {
    return {
        instance: InstanceStore.get(),
        publisher: PublisherStore.get(getParams.lookup),
        results: ResultStore.query({'publisher_id': getParams.lookup}),
        sources: SourceStore.query({'publisher_id': getParams.lookup}),
        performance: PerformanceStore.query({'publisher_id': getParams.lookup})
    };
}

var Publisher = React.createClass({

    mixins: [Router.State, Mixins.DataFetchingMixin],

    statics: {
        getStateFromStores: getStateFromStores
    },

    componentWillUnmount: function () {
        InstanceStore.removeChangeListener(this._onChange);
        PublisherStore.removeChangeListener(this._onChange);
        SourceStore.removeChangeListener(this._onChange);
        ResultStore.removeChangeListener(this._onChange);
        RunStore.removeChangeListener(this._onChange);
        PerformanceStore.removeChangeListener(this._onChange);
    },

    componentDidMount: function() {
        InstanceStore.addChangeListener(this._onChange);
        PublisherStore.addChangeListener(this._onChange);
        SourceStore.addChangeListener(this._onChange);
        ResultStore.addChangeListener(this._onChange);
        RunStore.addChangeListener(this._onChange);
        PerformanceStore.addChangeListener(this._onChange);
    },

    render: function() {
        var _columns = [{key:'period_id', label:'period'},
                        {key:'title'}, {key:'data', label:'URL'},
                        {key:'format'},
			{key:'schema', label:'Error details'},
			{key:'score'}];
        return (
            <div>
                <HeaderPanel instance={this.state.instance} />
                <div className="dashboard">
                    <div className="jumbotron">
                        <PublisherOverview publisher={this.state.publisher || {}} results={this.state.results} />
                    </div>
                    <div className="container">
                        <PublisherChart results={this.state.results} publisher={this.state.publisher || {}} performance={this.state.performance} />
                    </div>
                    <section className="publishers">
                        <SortableTable title={'data files'} rows={this.state.sources}  results={this.state.results} columns={_columns} sort={[['periodTimestamp', false], ['score', false]]}/>
                    </section>
                </div>
                <FooterPanel instance={this.state.instance} />
            </div>
        );
    }

});


module.exports = Publisher;
