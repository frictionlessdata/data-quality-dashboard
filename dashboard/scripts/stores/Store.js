var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'STORE_CHANGE';
var _data = require('../utils/APIUtils.js')._data;


var Store = assign({}, EventEmitter.prototype, {

    get: function(model, id) {
        return _.find(_data[model], {'id': id});
    },

    query: function(model, options) {
        if (typeof(options) === 'undefined') {
            return _data[model];
        } else {
            return _.where(_data[model], options);
        }
    },

    all: function() {
        return _data;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        switch(payload.action.type) {
            case 'RECEIVE_DATA':
                _data = payload.action.data;
                Store.emitChange();
                break;
            default:
                // do nothing
        }

        return true;
    })

});


module.exports = Store;
