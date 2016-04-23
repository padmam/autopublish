function process(pathToPackageJson) {
  var pkg = require(pathToPackageJson);
  
  console.log( 'current version is', pkg.version );
}
