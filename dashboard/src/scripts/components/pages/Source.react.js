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
                <section id="main" className="container">
                    <Row>
                        <Col md={12}>
                            <h2>{this.state.source.name} Overview ({this.state.publisher.name})</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SourceOverview results={this.state.results} source={this.state.source} />
                        </Col>
                        <Col md={6}>
                            <SourceChart results={this.state.results} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h2>Actions</h2>
                        </Col>
                        <Col md={12}>
                            <SourceActions instance={this.state.instance} source={this.state.source} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h2>Report</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {/*<SourceReport instance={this.state.instance} source={this.state.source} />*/}
                        </Col>
                    </Row>
                </section>
                <FooterPanel instance={this.props.instance} />
            </div>
        );
    }

});


module.exports = Source;
