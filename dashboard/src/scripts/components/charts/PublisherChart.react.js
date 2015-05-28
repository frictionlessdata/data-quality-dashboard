var React = require('react');
var LineChart = require('react-chartjs/line');
var UIUtils = require('../../utils/UIUtils');
var CalcUtils = require('../../utils/CalcUtils');


var MetaChart = React.createClass({
    render: function() {
            var linePayload = UIUtils.makeScoreLinePayload(this.props.results, this.props.performance);
            return (
                <section className="line-chart">
                    <LineChart
                        id="lineChart"
                        data={linePayload.data}
                        options={linePayload.options}
                        width={1140}
                        height={300}
                    />
                    <div id="chartLegend">{UIUtils.makeLegend()}</div>
                </section>
            );
    }
});


module.exports = MetaChart;
