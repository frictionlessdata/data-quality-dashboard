var React = require('react');
var Router = require('react-router');
var Store = require('../../stores/Store');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var HeaderPanel = require('../panels/Header.react');
var FooterPanel = require('../panels/Footer.react');
var PublisherTable = require('../tables/PublisherTable.react');
var MainOverview = require('../MainOverview.react');
var MainChart = require('../charts/MainChart.react');
var APIUtils = require('../../utils/APIUtils');
var Mixins = require('./Mixins.react');


function getStateFromStores(getParams) {
    return Store.all();
}

var Main = React.createClass({

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
        console.log(this.state);
        return (
            <div>
                <HeaderPanel instance={this._waiting ? {}:this.state.instance} publishers={this._waiting ? []:this.state.publishers} />
                <section id="main" className="container">
                    <Row>
                        <Col md={12}>
                            <h2>Overview</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <MainOverview results={this._waiting ? []:this.state.results} />
                        </Col>
                        <Col md={6}>
                            <MainChart results={this._waiting ? []:this.state.results} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <PublisherTable publishers={this._waiting ? []:this.state.publishers} />
                        </Col>
                    </Row>
                </section>
                <FooterPanel instance={this._waiting ? {}:this.state.instance} />
            </div>
        );
    }
});


module.exports = Main;
