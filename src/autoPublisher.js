var _ = require('lodash');
var P = require('bluebird');
var path = require('path');
var semver = require('semver');

module.exports = function createAutoPublisher(client,moduleDir) {

  var pkg = require(path.join(moduleDir,'package.json'));

  function localVersion() {
    return pkg.version;
  }

  function packageName() {
    return pkg.name;
  }

  function checkForEquivVersion() {
    return client.existingVersionsFor(pkg.name).then(function (versions) {
      return _.find( versions, function (version) {
        return semver.eq(version,pkg.version);
      });
    });
  }

  return {
    checkForEquivVersion:checkForEquivVersion,
    localVersion:localVersion,
    packageName:packageName
  };
}
