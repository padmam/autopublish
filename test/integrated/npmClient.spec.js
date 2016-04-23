var RegClient = require('npm-registry-client')
var npmClient = require('../../src/npmClient');

describe('npmClient', function () {
  it('can pull existing versions for a public module', function (done) { 
    var regClient = new RegClient();
    var client = npmClient(regClient);
    client.existingVersionsFor('cows', function (err,versions) {
      if( err ) throw err;

      expect(versions).to.be.an.instanceof(Array);
      expect(versions).to.have.length.greaterThan(5);
      expect(versions).to.include('1.1.0');
      expect(versions).to.include('0.2.0');

      done();
    });
  });
});
