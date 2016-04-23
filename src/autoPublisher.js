var _ = require('lodash');
var P = require('bluebird');
var path = require('path');
var RegClient = require('npm-registry-client')
var npmClient = require('./npmClient');

var regClient = new RegClient();
var client = npmClient(regClient);

module.exports = function createAutoPublisher(moduleDir) {
  var pkg = require(path.join(moduleDir,'package.json'));
  var currVersion = pkg.version;

  function couldPublish() {
    return client.existingVersionsFor(pkg.name).then(function (versions) {
      return !_.includes(versions,pkg.version);
    });
  }

  return {
    couldPublish:couldPublish
  };
}
