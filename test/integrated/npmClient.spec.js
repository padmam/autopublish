var RegClient = require('npm-registry-client')
var npmClient = require('../../src/npmClient');

describe('npmClient', function () {
  it('can pull existing versions for a public module', function () { 
    var regClient = new RegClient();
    var client = npmClient(regClient);
    return client.existingVersionsFor('cows').then(function (versions) {
      expect(versions).to.be.an.instanceof(Array);
      expect(versions).to.have.length.greaterThan(5);
      expect(versions).to.include('1.1.0');
      expect(versions).to.include('0.2.0');
    });
  });
});
