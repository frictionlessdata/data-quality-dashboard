var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var APIUtils = require('../utils/APIUtils');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    receiveAll: function(data, name) {
        Dispatcher.dispatch({
            type: ActionTypes.RECEIVE[name],
            data: data
        });
  }

};
