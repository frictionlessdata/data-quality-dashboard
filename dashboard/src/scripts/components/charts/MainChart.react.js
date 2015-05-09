var React = require('react');
var LineChart = require('react-chartjs/line');
var PieChart = require('react-chartjs/pie');
var UIUtils = require('../../utils/UIUtils');
var CalcUtils = require('../../utils/CalcUtils');


var MainChart = React.createClass({
    render: function() {
        var piePayload = UIUtils.makeScorePiePayload(this.props.results);
        var linePayload = UIUtils.makeScoreLinePayload(this.props.results);
        return (
            <section className="line-chart">
                <div className="intro">
                    <div className="text">
                        <h2>Spend Publishing</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus mauris molestie accumsan laoreet. Vestibulum elementum porta rhoncus. Vivamus sagittis urna congue sollicitudin mollis. Phasellus dictum elit sed posuere mattis. Donec egestas libero sit amet elit congue, quis placerat tellus pharetra.</p>
                    </div>
                    <div className="more">
                        <a className="btn btn-default" href="#" role="button">More</a>
                    </div>
                </div>
                <PieChart
                    data={piePayload.data}
                    options={piePayload.options}
                    width={400}
                    height={280}
                />
                <LineChart
                    data={linePayload.data}
                    options={linePayload.options}
                    width={740}
                    height={300}
                />
            </section>
        );
    }
});


module.exports = MainChart;
