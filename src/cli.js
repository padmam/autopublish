var npmlog = require('npmlog');
var createAutoPublisher = require('./autoPublisher');

npmlog.heading = 'autopublish';

module.exports = function run(moduleDir) {
  var autoPublisher = createAutoPublisher(moduleDir);

  npmlog.info('Local module version: '+autoPublisher.localVersion());
  autoPublisher.checkForEquivVersion().then( function (equivalentPublishedVersion){
    if (equivalentPublishedVersion) {
      npmlog.info('The registry already contains the equivalent version '+equivalentPublishedVersion);
      process.exit(0);
    } else {
      npmlog.info('This version has not been published to the registry');
    }
  });
}
