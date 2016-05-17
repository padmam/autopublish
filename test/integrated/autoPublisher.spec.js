var path = require('path');
var fs = require('fs');
var temp = require("temp").track();
var boot = require('../../src/boot');

var createAutoPublisher = require('../../src/autoPublisher');

function createFakeModuleDir(packageJsonContents){
  var dir = temp.mkdirSync();
  fs.writeFileSync(
    path.join(dir,'package.json'),
    JSON.stringify(packageJsonContents)
  );
  return dir;
}

describe('autoPublisher', function () {
  var client;
  before( function() {
    return boot().then( function(deps) { 
      client = deps.client;
    });
  });

  it('identifies that a new version could be published', function () {
    const fakeModuleDir = createFakeModuleDir({name:'cows',version:'16.6000.1513'});
    const autoPublisher = createAutoPublisher(client,fakeModuleDir);

    return expect(autoPublisher.checkForEquivVersion()).to.eventually.be.undefined;
  });

  it('identifies that an existing version could not be published', function () {
    const fakeModuleDir = createFakeModuleDir({name:'cows',version:'1.1.0'});
    const autoPublisher = createAutoPublisher(client,fakeModuleDir);
    return expect(autoPublisher.checkForEquivVersion()).to.eventually.equal('1.1.0');
  });

  it('identifies that an existing version with a different build hash should not be published', function () {
    const fakeModuleDir = createFakeModuleDir({name:'cows',version:'1.1.0+build15'});
    const autoPublisher = createAutoPublisher(client,fakeModuleDir);
    return expect(autoPublisher.checkForEquivVersion()).to.eventually.equal('1.1.0');
  });

  it('throws if the module cannot be found', function () {
    const fakeModuleDir = createFakeModuleDir({name:'a-non-existant-module-blah-blah',version:'blah'});
    const autoPublisher = createAutoPublisher(client,fakeModuleDir);
    return expect(autoPublisher.checkForEquivVersion()).to.eventually.be.rejectedWith('could not find the module: a-non-existant-module-blah-blah');
  });
});
