var React = require('react');


var DataFetchingMixin = {

    getInitialState: function() {
        return this.constructor.getStateFromStores(this.getParams());
    },

    getDefaultProps: function() {
        return {_waiting: true};
    }

//    componentWillMount: function() {
//         if (this.props._waiting) {
//             this.fetch(this.props);
//        }
//    },

//    fetch: function(getParams) {
//        this.constructor.bootstrap(getParams, function(data) {
//            this.setState(data);
//        }.bind(this));
//    }

};

module.exports = {
    DataFetchingMixin: DataFetchingMixin
};
