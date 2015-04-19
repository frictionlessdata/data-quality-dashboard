var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var APIUtils = require('../utils/APIUtils');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var assign = require('object-assign');


var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _publishers = [];

function _addPublishers(data) {
    _publishers = data;
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
      return _.find(_publishers, {'id': id});
  },

  query: function(options) {
      if (typeof(options) === 'undefined') {
          return _publishers;
      } else {
          return _.where(_publishers, options);
      }
  },

  all: function() {
    return _publishers;
  }

});


Store.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {
    case ActionTypes.RECEIVE['publishers']:
      _addPublishers(action.data);
      Store.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = Store;
