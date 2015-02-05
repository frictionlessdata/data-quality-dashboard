var React = require('react');
var Store = require('../../stores/Store');

var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var HeaderPanel = require('../panels/Header.react');
var FooterPanel = require('../panels/Footer.react');
var PublisherTable = require('../tables/PublisherTable.react');
var MainOverview = require('../MainOverview.react');
var MainChart = require('../charts/MainChart.react');


function getStateFromStores() {
    return Store.all();
}

var Main = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        Store.addChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <HeaderPanel instance={this.state.instance} publishers={this.state.publishers} />
                <section id="main" className="container">
                    <Row>
                        <Col md={12}>
                            <h2>Overview</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <MainOverview results={this.state.results} />
                        </Col>
                        <Col md={6}>
                            <MainChart results={this.state.results} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <PublisherTable publishers={this.state.publishers} />
                        </Col>
                    </Row>
                </section>
                <FooterPanel instance={this.state.instance} />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }

});


module.exports = Main;
