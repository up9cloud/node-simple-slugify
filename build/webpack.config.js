const path = require('path')
const _ = require('lodash')
const { name } = require('../package.json')

const mode = 'production'
const entry = path.join(__dirname, '..', 'src', 'index.js')
module.exports = [
  // browser
  {
    mode,
    entry,
    output: {
      filename: `${name}.min.js`,
      path: path.resolve(__dirname, '..', 'dist'),
      library: _.camelCase(name)
    }
  },
  // nodejs
  {
    mode,
    entry,
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '..', 'lib'),
      libraryTarget: 'commonjs2'
      // "var", "assign", "this", "window", "self", "global",
      // "commonjs", "commonjs2", "commonjs-module", "amd", "umd", "umd2", "jsonp"]
    }
  }
]
