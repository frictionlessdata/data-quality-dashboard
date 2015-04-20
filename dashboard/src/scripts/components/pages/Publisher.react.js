var React = require('react');
var Router = require('react-router');
var InstanceStore = require('../../stores/instanceStore');
var PublisherStore = require('../../stores/publisherStore');
var SourceStore = require('../../stores/sourceStore');
var ResultStore = require('../../stores/resultStore');
var RunStore = require('../../stores/runStore');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var HeaderPanel = require('../panels/Header.react');
var FooterPanel = require('../panels/Footer.react');
var PublisherChart = require('../charts/PublisherChart.react');
var PublisherOverview = require('../PublisherOverview.react');
var PublisherActions = require('../PublisherActions.react');
var PublisherTable = require('../tables/PublisherTable.react');
var SourceTable = require('../tables/SourceTable.react');
var APIUtils = require('../../utils/APIUtils');
var Mixins = require('./Mixins.react');


function getStateFromStores(getParams) {
    return {
        instance: InstanceStore.get(),
        publisher: PublisherStore.get(getParams.lookup),
        results: ResultStore.query({'publisher_id': getParams.lookup}),
        sources: SourceStore.all({'publisher_id': getParams.lookup})
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
                <section id="main" className="container">
                    <Row>
                        <Col md={12}>
                <h2>{this.state.publisher.name} Overview</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <PublisherOverview results={this.state.results} />
                        </Col>
                        <Col md={6}>
                            <PublisherChart results={this.state.results} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h2>Actions</h2>
                        </Col>
                        <Col md={12}>
                            <PublisherActions />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <SourceTable sources={this.state.sources}/>
                        </Col>
                    </Row>
                </section>
                <FooterPanel instance={this.state.instance} />
            </div>
        );
    }

});


module.exports = Publisher;
