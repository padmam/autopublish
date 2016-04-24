var npmlog = require('npmlog');
var createAutoPublisher = require('./autoPublisher');
var boot = require('./boot');

npmlog.heading = 'autopublish';

module.exports = function run(packageDir) {
  return boot().then( function(deps) { 
    var npmClient = deps.client;
    var autoPublisher = createAutoPublisher(npmClient,packageDir);

    npmlog.info('Package name: '+autoPublisher.packageName());
    npmlog.info('Local version: '+autoPublisher.localVersion());
    autoPublisher.checkForEquivVersion().then( function (equivalentPublishedVersion){
      if (equivalentPublishedVersion) {
        npmlog.info('The registry already contains the equivalent version '+equivalentPublishedVersion);
        process.exit(0);
      }

      npmlog.info('This version has not been published to the registry. Publishing...');
      npmClient.publish(packageDir);
    });
  })
}
