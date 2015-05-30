var React = require('react');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var ReportUtils = require('../utils/ReportUtils');


var SourceReport = React.createClass({

    getInitialState: function() {
        return {
            success: '',
            message: '',
            status: ''
        };
    },

    componentDidMount: function() {
        var _report_options = {
            validator_url: this.props.instance.validator_url,
            data_source: this.props.source.url,
            schema_spec_source: this.props.source.schema
        };
        res = ReportUtils.generateReport(_report_options);
        res.end(function(error, data) {
            var _payload = JSON.parse(data.text);
            if (this.isMounted()) {
                this.setState({
                    message: _payload.message,
                    status: _payload.status
                });
            }
        }.bind(this));
    },

    render: function() {
        return (
            <Row>
                <Col md={12}>
                    <ul>
                        <li><strong>Success:</strong> {this.state.status}</li>
                        <li><strong>Message:</strong> {this.state.message}</li>
                    </ul>
                </Col>
            </Row>
        );
    }
});


module.exports = SourceReport;
