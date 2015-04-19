var React = require('react');


var DataFetchingMixin = {

    getInitialState: function() {
        return this.constructor.getStateFromStores(this.getParams());
    },

    getDefaultProps: function() {
        return {_waiting: true};
    },

    _onChange: function () {
        this.setState(this.constructor.getStateFromStores(this.getParams()));
    }

};

module.exports = {
    DataFetchingMixin: DataFetchingMixin
};
