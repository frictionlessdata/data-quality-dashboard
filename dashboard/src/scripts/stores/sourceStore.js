var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var APIUtils = require('../utils/APIUtils');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _sources = [];

function _addSources(data) {
    _sources = data;
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
      return _.find(_sources, {'id': id});
  },

  query: function(options) {
      if (typeof(options) === 'undefined') {
          return _sources;
      } else {
          console.log(options);
          console.log(_sources);
          return _.where(_sources, options);
      }
  },

  all: function() {
    return _sources;
  }

});


Store.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {

  case ActionTypes.RECEIVE['sources']:
      _addSources(action.data);
      Store.emitChange();
      break;

      default:
      // do nothing
  }

});

module.exports = Store;
