var React = require('react');
var Router = require('react-router');
var InstanceStore = require('../../stores/instanceStore');
var PublisherStore = require('../../stores/publisherStore');
var SourceStore = require('../../stores/sourceStore');
var ResultStore = require('../../stores/resultStore');
var RunStore = require('../../stores/runStore');
var PerformanceStore = require('../../stores/performanceStore');
var SortableTable = require('../tables/SortableTable.react');
var MainOverview = require('../MainOverview.react');
var MainChart = require('../charts/MainChart.react');
var APIUtils = require('../../utils/APIUtils');
var Mixins = require('./Mixins.react');


function getStateFromStores() {
    return {
        instance: InstanceStore.get(),
        publishers: PublisherStore.all(),
        sources: SourceStore.all(),
        results: ResultStore.all(),
        runs: RunStore.all(),
        performance: PerformanceStore.query({'publisher_id': 'all'})
    };
}

var Main = React.createClass({

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
	var _columns = [{key:'title'}, {key:'type'}, {key:'homepage'},
                        {key:'email'},
                        {key:'completelyCorrect', label:'Correct',
			 help:'number of files with no errors at all'},
                        {key:'score', label:'score (all time)'},
                        {key:'lastFileDate', label:'last file'},
                        {key:'lastFileScore', label:'score',
			 help:'% correct (no errors)'}];
        return (
            <div>
                <div className="dashboard">
                    <div className="jumbotron">
                        <MainOverview dashboard={this.state.instance.name} results={this.state.results} publishers={this.state.publishers} />
                    </div>
                    <div className="container">
                        <MainChart results={this.state.results} performance={this.state.performance} />
                    </div>
                    <section className="publishers">
                        <SortableTable title={'publishers'} rows={this.state.publishers} results={this.state.results} columns={_columns} sort={[['lastFileScore', false], ['title', true]]} />
                    </section>
                </div>
            </div>
        );
    }
});


module.exports = Main;
