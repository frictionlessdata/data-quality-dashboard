import _ from 'lodash';
import Browser from 'zombie';
import {expect} from 'chai';
import start from '../app';

process.env.PORT = 3001;
Browser.localhost('127.0.0.1', process.env.PORT);

before(function(done) {
  start(done);
});

describe('Can visit core routes', function() {
  var browser = new Browser({maxWait: 5000});
  this.timeout(5000);
  it('should return the main page', function (done) {
    browser.visit('/', function() {
      browser.assert.success();
      done();
    });
  });
});
