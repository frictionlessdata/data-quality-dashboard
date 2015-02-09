var React = require('react');
var Store = require('../../stores/Store');
var Router = require('react-router');
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
    var _source =  Store.get('sources', getParams.lookup);
    return {
        instance: Store.query('instance'),
        publisher: Store.get('publishers', _source.publisher_id),
        source: _source,
        results: Store.query('results', {'source_id': getParams.lookup})
    };
}

var Source = React.createClass({

    mixins: [Router.State, Mixins.DataFetchingMixin],

    statics: {
        bootstrap: APIUtils.getData,
        getStateFromStores: getStateFromStores
    },

    componentDidMount: function() {
        Store.addChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this.constructor.getStateFromStores(this.getParams()));
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
