var React = require('react');
var Table = require('react-bootstrap/Table');
var Row = require('react-bootstrap/Row');
var Input = require('react-bootstrap/Input');
var Col = require('react-bootstrap/Col');
var Button = require('react-bootstrap/Button');


var SourceActions = React.createClass({
    render: function() {
        return (
            <Row>
                <Col md={12}>
                    <Button bsStyle="primary" className="disabled">Download data</Button>
                    <form class="form-inline" method="post" action={this.props.instance.validator_url}>
                        <Input type="hidden" name="data_source" value={this.props.source.url} />
                        <Input type="hidden" name="table_schema_source" value={this.props.source.schema} />
                        <Input class="btn btn-primary" type="submit" value="Make report" />
                    </form>
                </Col>
            </Row>
        );
    }
});


module.exports = SourceActions;
