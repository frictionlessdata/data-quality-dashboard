var React = require('react');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Button = require('react-bootstrap/Button');


var PublisherActions = React.createClass({
    render: function() {
        return (
            <Row>
                <Col md={12}>
                    <Button bsStyle="primary" className="disabled">Download data</Button>
                </Col>
            </Row>
        );
    }
});


module.exports = PublisherActions;
