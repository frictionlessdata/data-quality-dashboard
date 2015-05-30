var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var APIUtils = require('../utils/APIUtils');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _performance = [];

function _addPerformance(data) {
    _performance = data;
}


var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(publisher_id, period_id) {
    return _.find(_performance, {'publisher_id': publisher_id, 'period_id': period_id});
  },

  query: function(options) {
      if (typeof(options) === 'undefined') {
          return _performance;
      } else {
          return _.where(_performance, options);
      }
  },

  all: function() {
    return _performance;
  }

});


Store.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {
    case ActionTypes.RECEIVE['performance']:
      _addPerformance(action.data);
      Store.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = Store;
