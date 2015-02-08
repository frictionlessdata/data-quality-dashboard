var request = require('superagent');


function generateReport(options) {
    return request
        .post(options.validator_url)
        .send({
            data_source: options.data_source,
            schema_spec_source: options.schema_spec_source
        });
}

module.exports = {
    generateReport: generateReport
};
