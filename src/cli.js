var npmlog = require('npmlog');
var createAutoPublisher = require('./autoPublisher');
var boot = require('./boot');

npmlog.heading = 'autopublish';

module.exports = function run(moduleDir) {
  return boot().then( function(deps) { 
    var autoPublisher = createAutoPublisher(deps.client,moduleDir);

    npmlog.info('Package name: '+autoPublisher.packageName());
    npmlog.info('Local version: '+autoPublisher.localVersion());
    autoPublisher.checkForEquivVersion().then( function (equivalentPublishedVersion){
      if (equivalentPublishedVersion) {
        npmlog.info('The registry already contains the equivalent version '+equivalentPublishedVersion);
        process.exit(0);
      } else {
        npmlog.info('This version has not been published to the registry');
      }
    });
  })
}
