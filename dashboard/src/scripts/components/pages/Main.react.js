var React = require('react');
var Router = require('react-router');
var InstanceStore = require('../../stores/instanceStore');
var PublisherStore = require('../../stores/publisherStore');
var SourceStore = require('../../stores/sourceStore');
var ResultStore = require('../../stores/resultStore');
var RunStore = require('../../stores/runStore');
var HeaderPanel = require('../panels/Header.react');
var FooterPanel = require('../panels/Footer.react');
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
        runs: RunStore.all()
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
    },

    componentDidMount: function() {
        InstanceStore.addChangeListener(this._onChange);
        PublisherStore.addChangeListener(this._onChange);
        SourceStore.addChangeListener(this._onChange);
        ResultStore.addChangeListener(this._onChange);
        RunStore.addChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <HeaderPanel instance={this.state.instance} publishers={this.state.publishers} />
                <div className="dashboard">
                    <div className="jumbotron">
                        <MainOverview dashboard={this.state.instance.name} results={this.state.results} publishers={this.state.publishers} />
                    </div>
                    {/*<div className="container">
                        <MainChart results={this.state.results} />
                    </div>*/}
                    <section className="publishers">
                        <SortableTable title={'publishers'} rows={this.state.publishers} results={this.state.results} columns={['title', 'type', 'homepage', 'contact', 'email', 'score']} sort={[['score', false], ['title', true]]} />
                    </section>
                </div>
                <FooterPanel instance={this.state.instance} />
            </div>
        );
    }
});


module.exports = Main;
