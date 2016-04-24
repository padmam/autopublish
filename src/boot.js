var P = require('bluebird');
var npm = require('npm');
var npmClient = require('./npmClient');

module.exports = function boot() {
  return loadNpm().then(function(npm) {
    return {
      config: npm.config,
      client: npmClient(npm.config)
    };
  });
}

function loadNpm() {
  return new Promise(function(resolve,reject) {
    npm.load(function cb(err) {
      if (err) return reject(err);
      resolve(npm);
    }); 
  })
}

