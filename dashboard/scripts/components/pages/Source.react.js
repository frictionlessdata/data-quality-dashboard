var React = require('react');
var Store = require('../../stores/Store');
var Router = require('react-router');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var HeaderPanel = require('../panels/Header.react.js');
var FooterPanel = require('../panels/Footer.react.js');
var SourceChart = require('../charts/SourceChart.react.js');
var SourceOverview = require('../SourceOverview.react.js');
var SourceActions = require('../SourceActions.react.js');
var SourceReport = require('../SourceReport.react.js');


function getStateFromStores(lookup) {
    var _source =  Store.get('sources', lookup);
    return {
        instance: Store.query('instance'),
        publisher: Store.get('publishers', _source.publisher_id),
        source: _source,
        results: Store.query('results', {'source_id': lookup})
    };
}

var Source = React.createClass({

    mixins: [Router.State],

    getInitialState: function() {
        return getStateFromStores(this.getParams().lookup);
    },

    componentDidMount: function() {
        Store.addChangeListener(this._onChange);
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
    },

    _onChange: function() {
        this.setState(getStateFromStores(this.getParams().lookup));
    }

});


module.exports = Source;
