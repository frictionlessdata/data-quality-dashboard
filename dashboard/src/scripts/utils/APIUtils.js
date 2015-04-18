var ServerActionCreators = require('../actions/ServerActionCreators');
var CSVUtils = require('./CSVUtils');
var request = require('superagent');
var Config = require('../config.js');


// temp!!
var _publishers = [
  {
    "id":"xx_dept1",
    "parent_id":"",
    "name":"Department 1",
    "description":"",
    "url":"http://www.example.com/dept1",
    "jurisdiction_code":"XX",
    "email":"dept1-admin@example.com",
    "address":"",
    "contact":"Dept1 Admin",
    "score":2,
    "source_count":2
  },
  {
    "id":"xx_dept2",
    "parent_id":"",
    "name":"Department 2",
    "description":"",
    "url":"http://www.example.com/dept2",
    "jurisdiction_code":"XX",
    "email":"dept2-admin@example.com",
    "address":"",
    "contact":"Dept2 Admin",
    "score":4,
    "source_count":2
  },
  {
    "id":"xx_dept3",
    "parent_id":"",
    "name":"Department 3",
    "description":"",
    "url":"http://www.example.com/dept3",
    "jurisdiction_code":"XX",
    "email":"dept3-admin@example.com",
    "address":"",
    "contact":"Dept3 Admin",
    "score":6,
    "source_count":2
  },
  {
    "id":"xx_dept4",
    "parent_id":"",
    "name":"Department 4",
    "description":"",
    "url":"http://www.example.com/dept4",
    "jurisdiction_code":"XX",
    "email":"dept4-admin@example.com",
    "address":"",
    "contact":"Dept4 Admin",
    "score":8,
    "source_count":2
  },
  {
    "id":"xx_dept5",
    "parent_id":"",
    "name":"Department 5",
    "description":"",
    "url":"http://www.example.com/dept5",
    "jurisdiction_code":"XX",
    "email":"dept5-admin@example.com",
    "address":"",
    "contact":"Dept5 Admin",
    "score":10,
    "source_count":2
  },
  {
    "id":"xx_dept6",
    "parent_id":"",
    "name":"Department 6",
    "description":"",
    "url":"http://www.example.com/dept6",
    "jurisdiction_code":"XX",
    "email":"dept6-admin@example.com",
    "address":"",
    "contact":"Dept6 Admin",
    "score":2,
    "source_count":1
  },
  {
    "id":"xx_dept7",
    "parent_id":"",
    "name":"Department 7",
    "description":"",
    "url":"http://www.example.com/dept7",
    "jurisdiction_code":"XX",
    "email":"dept7-admin@example.com",
    "address":"",
    "contact":"Dept7 Admin",
    "score":4,
    "source_count":1
  },
  {
    "id":"xx_dept8",
    "parent_id":"",
    "name":"Department 8",
    "description":"",
    "url":"http://www.example.com/dept8",
    "jurisdiction_code":"XX",
    "email":"dept8-admin@example.com",
    "address":"",
    "contact":"Dept8 Admin",
    "score":6,
    "source_count":1
  },
  {
    "id":"xx_dept9",
    "parent_id":"",
    "name":"Department 9",
    "description":"",
    "url":"http://www.example.com/dept9",
    "jurisdiction_code":"XX",
    "email":"dept9-admin@example.com",
    "address":"",
    "contact":"Dept9 Admin",
    "score":8,
    "source_count":1
  },
  {
    "id":"xx_dept10",
    "parent_id":"",
    "name":"Department 10",
    "description":"",
    "url":"http://www.example.com/dept10",
    "jurisdiction_code":"XX",
    "email":"dept10-admin@example.com",
    "address":"",
    "contact":"Dept10 Admin",
    "score":10,
    "source_count":1
  },
  {
    "id":"xx_dept11",
    "parent_id":"xx_dept1",
    "name":"Department 11",
    "description":"",
    "url":"http://www.example.com/dept11",
    "jurisdiction_code":"XX",
    "email":"dept-1-admin@example.com",
    "address":"",
    "contact":"Dept11 Admin",
    "score":8,
    "source_count":1
  },
  {
    "id":"xx_dept12",
    "parent_id":"xx_dept2",
    "name":"Department 12",
    "description":"",
    "url":"http://www.example.com/dept12",
    "jurisdiction_code":"XX",
    "email":"dept-1-admin@example.com",
    "address":"",
    "contact":"Dept12 Admin",
    "score":8,
    "source_count":1
  },
  {
    "id":"xx_dept13",
    "parent_id":"xx_dept3",
    "name":"Department 13",
    "description":"",
    "url":"http://www.example.com/dept13",
    "jurisdiction_code":"XX",
    "email":"dept-1-admin@example.com",
    "address":"",
    "contact":"Dept13 Admin",
    "score":8,
    "source_count":1
  },
  {
    "id":"xx_dept14",
    "parent_id":"xx_dept4",
    "name":"Department 14",
    "description":"",
    "url":"http://www.example.com/dept14",
    "jurisdiction_code":"XX",
    "email":"dept-1-admin@example.com",
    "address":"",
    "contact":"Dept14 Admin",
    "score":8,
    "source_count":1
  },
  {
    "id":"xx_dept15",
    "parent_id":"xx_dept5",
    "name":"Department 15",
    "description":"",
    "url":"http://www.example.com/dept15",
    "jurisdiction_code":"XX",
    "email":"dept-1-admin@example.com",
    "address":"",
    "contact":"Dept15 Admin",
    "score":8,
    "source_count":1
  }
];
var _sources = [
  {
    "id":"source1",
    "publisher_id":"xx_dept1",
    "name":"Source 1",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":2,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source2",
    "publisher_id":"xx_dept2",
    "name":"Source 2",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":4,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source3",
    "publisher_id":"xx_dept3",
    "name":"Source 3",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":6,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source4",
    "publisher_id":"xx_dept4",
    "name":"Source 4",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":8,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source5",
    "publisher_id":"xx_dept5",
    "name":"Source 5",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":10,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source6",
    "publisher_id":"xx_dept6",
    "name":"Source 6",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":2,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source7",
    "publisher_id":"xx_dept7",
    "name":"Source 7",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":4,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source8",
    "publisher_id":"xx_dept8",
    "name":"Source 8",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":6,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source9",
    "publisher_id":"xx_dept9",
    "name":"Source 9",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":8,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source10",
    "publisher_id":"xx_dept10",
    "name":"Source 10",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":10,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source11",
    "publisher_id":"xx_dept11",
    "name":"Source 11",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":8,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source12",
    "publisher_id":"xx_dept12",
    "name":"Source 12",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":8,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source13",
    "publisher_id":"xx_dept13",
    "name":"Source 13",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":8,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source14",
    "publisher_id":"xx_dept14",
    "name":"Source 14",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":8,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  },
  {
    "id":"source15",
    "publisher_id":"xx_dept15",
    "name":"Source 15",
    "url":"https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv",
    "score":8,
    "revision":"1",
    "schema":"",
    "period_id":"2015-01-01",
    "timestamp":"2015-01-01"
  }
];
var _results = [
  {
    "source_id":"source1",
    "publisher_id":"xx_dept1",
    "period_id":"2015-01-01",
    "score":2,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source2",
    "publisher_id":"xx_dept2",
    "period_id":"2015-01-01",
    "score":4,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source3",
    "publisher_id":"xx_dept3",
    "period_id":"2015-01-01",
    "score":6,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source4",
    "publisher_id":"xx_dept4",
    "period_id":"2015-01-01",
    "score":8,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source5",
    "publisher_id":"xx_dept5",
    "period_id":"2015-01-01",
    "score":10,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source6",
    "publisher_id":"xx_dept6",
    "period_id":"2015-01-01",
    "score":2,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source7",
    "publisher_id":"xx_dept7",
    "period_id":"2015-01-01",
    "score":4,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source8",
    "publisher_id":"xx_dept8",
    "period_id":"2015-01-01",
    "score":6,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source9",
    "publisher_id":"xx_dept9",
    "period_id":"2015-01-01",
    "score":8,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source10",
    "publisher_id":"xx_dept10",
    "period_id":"2015-01-01",
    "score":10,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source11",
    "publisher_id":"xx_dept11",
    "period_id":"2015-01-01",
    "score":8,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source12",
    "publisher_id":"xx_dept12",
    "period_id":"2015-01-01",
    "score":8,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source13",
    "publisher_id":"xx_dept13",
    "period_id":"2015-01-01",
    "score":8,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source14",
    "publisher_id":"xx_dept14",
    "period_id":"2015-01-01",
    "score":8,
    "timestamp":"2015-01-01"
  },
  {
    "source_id":"source15",
    "publisher_id":"xx_dept15",
    "period_id":"2015-01-01",
    "score":8,
    "timestamp":"2015-01-01"
  }
];
var _instance = {
    name: 'Spend Publishing Dashboard',
    admin: 'paulywalsh@gmail.com',
    backend: 'https://rawgit.com/pwalsh/spd-example/master',
    validator_url: 'http://goodtables.okfnlabs.org/api/run'
};

var _data = {
    publishers: _publishers,
    sources: _sources,
    results: _results,
    instance: _instance
};

module.exports = {
    getData: function(props, callback) {
        var data = {};
        var response = request
             .get(instance)
             .end(function(res) {
                 data.instance = JSON.parse(res.text);

                 request.get(publishers).end(function() {
                     data.publishers = _publishers;
                     callback(data);
                 });

                 ServerActionCreators.dataReady(data);
             });
    },
    _data: _data
};
