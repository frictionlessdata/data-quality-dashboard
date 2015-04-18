var AppDispatcher = require('../dispatcher/AppDispatcher');


module.exports = {
    dataReady: function(data) {
        AppDispatcher.handleServerAction({
            type: 'RECEIVE_DATA',
            data: data
        });
    }
};
