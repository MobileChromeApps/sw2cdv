#!/usr/bin/env node

'use strict';

/******************************************************************************/

// Note: you cannot use ecma6 features not offered directly by all node version from within this file,
// because this use of babel (6to5) clobbers require() and only affects future imported scripts.
require("babel/register")({
    ignore: false,
    only: new RegExp(path.join(__dirname, 'src'))
});

/******************************************************************************/

exports.create = require('./src/create');
exports.build = require('./src/build');
exports.run = require('./src/run');

/******************************************************************************/

if (require.main === module) {
  require('./src/cli')()
    .catch(function(err) {
      console.error('[Error]:', err);
    })
}
