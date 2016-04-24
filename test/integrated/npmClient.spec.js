var RegClient = require('npm-registry-client')
var boot = require('../../src/boot');

describe('npmClient', function () {
  var client;
  before( function() {
    return boot().then( function(deps) { 
      client = deps.client;
    });
  });

  it('can pull existing versions for a public package', function () { 
    return client.existingVersionsFor('cows').then(function (versions) {
      expect(versions).to.be.an.instanceof(Array);
      expect(versions).to.have.length.greaterThan(5);
      expect(versions).to.include('1.1.0');
      expect(versions).to.include('0.2.0');
    });
  });

  if (process.env.EXAMPLE_PRIVATE_PACKAGE) {
    it('can pull existing versions for a private package', function () { 
      return client.existingVersionsFor(process.env.EXAMPLE_PRIVATE_PACKAGE).then(function (versions) {
        expect(versions).to.be.an.instanceof(Array);
        expect(versions).to.have.length.greaterThan(5);
        expect(versions).to.include('1.0.0');
        expect(versions).to.include('1.0.6');
      });
    });
  }else{
    xit('can pull existing versions for a private package [skipped because no EXAMPLE_PRIVATE_PACKAGE env var provided]');
  }
});
