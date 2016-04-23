var _ = require('lodash');
var baseRegistryUri = "https://registry.npmjs.org/";

module.exports = function createNpmClient(regClient) {
  function existingVersionsFor(moduleName,cb){
    var url = baseRegistryUri + moduleName;
    regClient.get(url, {}, function (error, data) {
      if( error ) return cb(error); 

      cb(null,_.keys(data.versions));
    });
  }

  return {
    existingVersionsFor: existingVersionsFor
  };
};
