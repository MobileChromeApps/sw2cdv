'use strict';

/******************************************************************************/

let child_process = require('child_process');
let _ = require('lodash');

/******************************************************************************/

// Usage:
// pSpawn('git', ['arg1', 'arg2', 'arg3'])
// pSpawn('git', 'arg1', 'arg2', 'arg3')
// pSpawn('git', { stdio: 'ignore' }, ['arg1', 'arg2', 'arg3'])
// pSpawn('git', { stdio: 'pipe'   }, 'arg1', 'arg2', 'arg3')
exports = module.exports = function pSpawn(cmd, opts = {}, ...args) {
  if (!_.isPlainObject(opts)) {
    args.unshift(opts);
    opts = {};
  }
  opts.stdio = (opts.stdio === undefined) ? 'inherit' : opts.stdio;
  opts.echoCommand = (opts.echoCommand === undefined) ? false : opts.echoCommand;
  args = _.flatten(args);

  if (opts.echoCommand) {
    console.info('[Spawning]:', cmd, args);
  }

  return new Promise(function(resolve, reject) {
    let child = child_process.spawn(cmd, args, opts);
    var didReturn = false;
    child.on('error', function(e) {
      if (!didReturn) {
        didReturn = true;
        reject(e);
      }
    });
    child.on('close', function(code) {
      if (!didReturn) {
        didReturn = true;
        if (code) {
          reject(new Error(code));
        } else {
          resolve();
        }
      }
    });
  });
};
