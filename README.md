# autopublish

## what
autopublish is a simple command-line tool to automagically publish an npm module to an npm registry when its version has changed. Autopublish is designed to be plugged into a CI/CD pipeline. It supports custom registries and private modules (e.g. as defined in an `.npmrc` file).

## why
It's usually a good idea for humans to decide when a change to a module's implementation warrants a version change, as well as how big that change should be. However it's not a good idea to rely on the human to remember to do the toil of testing and publishing the module. Humans tend to forget things and to not always do tasks the same way. That's why we use CI/CD tools. Autopublish allows humans to remain in control of module version changes while removing the boring parts.

## how
autopublish detects whether the current module should be published by checking to see whether the registry already contains a logically equivalent version, as defined by the `semver` module's `eq` function. If an equivalent version has not already been published then the local version is published.


## Prior art
['publish' module](https://www.npmjs.com/package/publish)
