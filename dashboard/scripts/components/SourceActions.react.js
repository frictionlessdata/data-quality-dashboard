var React = require('react');
var Table = require('react-bootstrap/Table');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Button = require('react-bootstrap/Button');


var SourceActions = React.createClass({
    render: function() {
        return (
            <Row>
                <Col md={12}>
                    <Button bsStyle="primary">Download data</Button>
                </Col>
            </Row>
        );
    }
});


module.exports = SourceActions;
