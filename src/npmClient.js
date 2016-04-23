var _ = require('lodash');
var P = require('bluebird');
var baseRegistryUri = "https://registry.npmjs.org/";

module.exports = function createNpmClient(regClient) {
  var clientGet = P.promisify(regClient.get, {context:regClient});

  function existingVersionsFor(moduleName,cb){
    var url = baseRegistryUri + moduleName;
    return clientGet(url, {}).then(function (data) {
      return _.keys(data.versions);
    }).catch(function (err) {
      if( err.statusCode === 404 ) {
        return Promise.reject('could not find the module: '+moduleName);
      }
      return Promise.reject(err);
    });
  }

  return {
    existingVersionsFor: existingVersionsFor
  };
};
