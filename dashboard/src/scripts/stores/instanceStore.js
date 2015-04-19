var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var APIUtils = require('../utils/APIUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _instance = {};

function _addInstance(rawInstance) {
    _instance = rawInstance;
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

  get: function() {
    return _instance;
  }

});


Store.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {

  case ActionTypes.RECEIVE['instance']:
      _addInstance(action.data);
      Store.emitChange();
      break;

      default:
      // do nothing
  }

});

module.exports = Store;
