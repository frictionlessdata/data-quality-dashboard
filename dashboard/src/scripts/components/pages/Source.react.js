var React = require('react');
var Router = require('react-router');
var InstanceStore = require('../../stores/instanceStore');
var PublisherStore = require('../../stores/publisherStore');
var SourceStore = require('../../stores/sourceStore');
var ResultStore = require('../../stores/resultStore');
var RunStore = require('../../stores/runStore');
var HeaderPanel = require('../panels/Header.react');
var FooterPanel = require('../panels/Footer.react');
var SourceChart = require('../charts/SourceChart.react');
var SourceOverview = require('../SourceOverview.react');
var SourceActions = require('../SourceActions.react');
var SourceReport = require('../SourceReport.react');
var APIUtils = require('../../utils/APIUtils');
var Mixins = require('./Mixins.react');


function getStateFromStores(getParams) {
    var _source =  SourceStore.get(getParams.lookup);
    return {
        instance: InstanceStore.get(),
        publisher: PublisherStore.get(_source.publisher_id),
        source: _source,
        results: ResultStore.query({'source_id': getParams.lookup})
    };
}

var Source = React.createClass({

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
                <HeaderPanel instance={this.state.instance} />
                <div className="dashboard">
                    <div className="jumbotron">
                        <SourceOverview results={this.state.results} source={this.state.source} />
                    </div>
                    {/*<div className="container">
                        <SourceChart results={this.state.results} publisher={this.state.publisher} source={this.state.source} />
                    </div>*/}
                    <div className="container">
                        <div className="intro">
                            <div className="text">
                                <h2>Report</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus mauris molestie accumsan laoreet. Vestibulum elementum porta rhoncus. Vivamus sagittis urna congue sollicitudin mollis. Phasellus dictum elit sed posuere mattis. Donec egestas libero sit amet elit congue, quis placerat tellus pharetra.</p>
                            </div>
                            <SourceActions instance={this.state.instance} source={this.state.source} />
                            {/*<SourceReport instance={this.state.instance} source={this.state.source} />*/}
                        </div>
                    </div>
                </div>
                <FooterPanel instance={this.state.instance} />
            </div>
        );
    }

});


module.exports = Source;
