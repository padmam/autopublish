var path = require('path');
var createAutoPublisher = require('../src/autoPublisher');

var fixturePackageJsonPath = path.resolve(__dirname,'fixtures/package.json');

describe('autoPublisher', function () {
  it('detects that a new package version is available', function () {
    var autoPublisher = createAutoPublisher({
      packageJsonPath: fixturePackageJsonPath
    });

    expect(autoPublisher).to.exist;
  });
});
