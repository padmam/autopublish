var _ = require('lodash');
var P = require('bluebird');
var baseRegistryUri = "https://registry.npmjs.org/";

module.exports = function createNpmClient(regClient) {
  var clientGet = P.promisify(regClient.get, {context:regClient});

  function existingVersionsFor(moduleName,cb){
    var url = baseRegistryUri + moduleName;
    return clientGet(url, {}).then(function (data) {
      return _.keys(data.versions);
    });
  }

  return {
    existingVersionsFor: existingVersionsFor
  };
};
