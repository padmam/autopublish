var _ = require('lodash');
var P = require('bluebird');
var RegClient = require('npm-registry-client');

// map-to-registry contains logic for figuring out the correct 
// registry uri and auth to use for a given package name, based on things
// like the package's scope and the npm config loaded from .npmrc, etc.
// Unfortunately this module is embedded in the guts of the npm module, 
// so we have to reach in to grab it.
var mapToRegistry = require("npm/lib/utils/map-to-registry");
mapToRegistry = P.promisify(mapToRegistry);

function lookupUriAndAuth(npmConfig,packageName) {
  return new Promise(function (resolve, reject) {
    mapToRegistry(packageName, npmConfig, function cb(er,uri,auth) {
      if (er) return reject(er);
      resolve({uri:uri,auth:auth});
    });
  });
}


module.exports = function createNpmClient(npmConfig) {
  var registry = new RegClient(npmConfig);

  var clientGet = P.promisify(registry.get, {context:registry});

  function existingVersionsFor(packageName){
    return lookupUriAndAuth(npmConfig,packageName).then( function (uriAndAuth){
      var uri = uriAndAuth.uri;
      var auth = uriAndAuth.auth;
      return clientGet(uri, {auth:auth});
    }).then(function (data) {
      return _.keys(data.versions);
    }).catch(function (err) {
      if( err.statusCode === 404 ) {
        return Promise.reject('could not find the module: '+packageName);
      }
      return Promise.reject(err);
    });
  }

  return {
    existingVersionsFor: existingVersionsFor
  };
};
