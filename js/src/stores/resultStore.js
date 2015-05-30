var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var APIUtils = require('../utils/APIUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _results = [];

function _addResults(data) {
    _results = data;
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

  get: function(id) {
      return _.find(_results, {'id': id});
  },

  query: function(options) {
      if (typeof(options) === 'undefined') {
          return _results;
      } else {
          return _.where(_results, options);
      }
  },

  all: function() {
    return _results;
  }

});


Store.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {

  case ActionTypes.RECEIVE['results']:
      _addResults(action.data);
      Store.emitChange();
      break;

      default:
      // do nothing
  }

});

module.exports = Store;
