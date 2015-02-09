var csv = require('csv');
var parser = csv.parse();
var output = [];


function toJSON(text) {
    console.log('in tojson');
    console.log(text);
    parser.write(text);
    return parser;
}

module.exports = {
    toJSON: toJSON
};
