var React = require('react');
var LineChart = require('react-chartjs/line');
var UIUtils = require('../../utils/UIUtils');
var CalcUtils = require('../../utils/CalcUtils');


var MetaChart = React.createClass({
    render: function() {
        var piePayload = UIUtils.makeScorePiePayload(this.props.results);
        var linePayload = UIUtils.makeScoreLinePayload(this.props.results);
        return (
            <section className="line-chart">
                <div className="intro">
                    <div className="text">
                        <h2>{this.props.source.name} ({this.props.publisher.name})</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus mauris molestie accumsan laoreet. Vestibulum elementum porta rhoncus. Vivamus sagittis urna congue sollicitudin mollis. Phasellus dictum elit sed posuere mattis. Donec egestas libero sit amet elit congue, quis placerat tellus pharetra.</p>
                    </div>
                    <div className="more">
                        <a className="btn btn-default" href="#" role="button">More</a>
                    </div>
                </div>
                <LineChart
                    data={linePayload.data}
                    options={linePayload.options}
                    width={1140}
                    height={300}
                />
            </section>
        );
    }
});


module.exports = MetaChart;
