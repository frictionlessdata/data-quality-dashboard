var React = require('react');
var LineChart = require('react-chartjs/line');
var UIUtils = require('../../utils/UIUtils');
var CalcUtils = require('../../utils/CalcUtils');


var MainChart = React.createClass({
    render: function() {
        var linePayload = UIUtils.makeScoreLinePayload(this.props.results, this.props.performance);
        return (
            <section className="line-chart">
                <div className="intro">
                    <div className="text">
                        <h2>Spend Publishing</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus mauris molestie accumsan laoreet. Vestibulum elementum porta rhoncus. Vivamus sagittis urna congue sollicitudin mollis. Phasellus dictum elit sed posuere mattis. Donec egestas libero sit amet elit congue, quis placerat tellus pharetra.</p>
                    </div>
                </div>
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


module.exports = MainChart;
