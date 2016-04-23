var _ = require('lodash');
var P = require('bluebird');
var path = require('path');
var semver = require('semver');
var RegClient = require('npm-registry-client')

var npmClient = require('./npmClient');

var regClient = new RegClient();
var client = npmClient(regClient);

module.exports = function createAutoPublisher(moduleDir) {
  var pkg = require(path.join(moduleDir,'package.json'));

  function localVersion() {
    return pkg.version;
  }

  function checkForEquivVersion() {
    return client.existingVersionsFor(pkg.name).then(function (versions) {
      return versions.find(function (version) {
        return semver.eq(version,pkg.version);
      });
    });
  }

  return {
    checkForEquivVersion:checkForEquivVersion,
    localVersion:localVersion
  };
}
