var React = require('react');
var Store = require('../../stores/Store');
var Router = require('react-router');
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
        instance: Store.query('instance'),
        publisher: Store.get('publishers', getParams.lookup),
        results: Store.query('results', {'publisher_id': getParams.lookup}),
        sources: Store.query('sources', {'publisher_id': getParams.lookup})
    };
}

var Publisher = React.createClass({

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
