var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

// temp!!
var _publishers = [
    {id: 'gb_this', name: 'Publisher1', url: 'http://url', something: 'something here2', score: 7, source_count: 21, parent: null},
    {id: 'gb_that', name: 'Publisher2', url: 'http://url', something: 'something here2', score: 4, source_count: 13, parent: null},
    {id: 'gb_other', name: 'Publisher21', url: 'http://url', something: 'something here21', score: 4, source_count: 13, parent: 'gb_that'}
];
var _sources = [
    {id: 'gy12w', publisher_id: 'gb_this', name: 'Source1', url: 'http://url/source', score: 9, revision: 2, report: 'http://url/', last_updated: '2015-01-01', period_id: '2015-01-01', extension: 'csv'},
    {id: 'au23h', publisher_id: 'gb_other', name: 'Source2', url: 'http://url/source', score: 6, revision: 2, report: 'http://url/', last_updated: '2015-01-01', period_id: '2015-01-01', extension: 'csv'},
    {id: 're71q', publisher_id: 'gb_other', name: 'Source3', url: 'http://url/source', score: 2, revision: 2, report: 'http://url/', last_updated: '2015-01-01', period_id: '2015-01-01', extension: 'csv'}
];
var _results = [
    {source_id: 're71q', publisher_id: 'gb_other', period_id: '2015-01-01', score: 2},
    {source_id: 'au23h', publisher_id: 'gb_other', period_id: '2015-01-01', score: 6},
    {source_id: 'gy12w', publisher_id: 'gb_this', period_id: '2015-01-01', score: 9}
];
var _instance = {
    name: 'Spend Publishing Dashboard',
    admin: 'paulywalsh@gmail.com',
    backend: 'https://rawgit.com/pwalsh/spd-example/master',
    validator: 'http://tabulator.herokuapps.com/'
};

var _data = {
    publishers: _publishers,
    sources: _sources,
    results: _results,
    instance: _instance
};
// temp!

var CHANGE_EVENT = 'STORE_CHANGE';


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
        var action = payload.action;

        switch(action.actionType) {
            case 'RECEIVE_DATA':
                _data = action.data;
                Store.emitChange();
                break;
            default:
                // do nothing
        }

        return true;
    })

});


module.exports = Store;
