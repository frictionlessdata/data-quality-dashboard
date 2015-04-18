var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var LineChart = require('react-chartjs/line');
var PieChart = require('react-chartjs/pie');
var UIUtils = require('../../utils/UIUtils');
var CalcUtils = require('../../utils/CalcUtils');


var MetaChart = React.createClass({
    render: function() {
        var piePayload = UIUtils.makeScorePiePayload(this.props.results);
        var linePayload = UIUtils.makeScoreLinePayload(this.props.results);
        return (
            <Panel>
                <Row>
                    <Col md={6}>
                        <PieChart
                            data={piePayload.data}
                            options={piePayload.options}
                            width={200}
                            height={200}
                        />
                    </Col>
                    <Col md={6}>
                        <LineChart
                            data={linePayload.data}
                            options={linePayload.options}
                            width={240}
                            height={240}
                        />
                    </Col>
                </Row>
            </Panel>
        );
    }
});


module.exports = MetaChart;
