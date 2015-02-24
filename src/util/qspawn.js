'use strict';

/******************************************************************************/

let Q = require('q');
let child_process = require('child_process');
let _ = require('lodash');

/******************************************************************************/

// Usage:
// qspawn('git', ['arg1', 'arg2', 'arg3'])
// qspawn('git', 'arg1', 'arg2', 'arg3')
// qspawn('git', { stdio: 'ignore' }, ['arg1', 'arg2', 'arg3'])
// qspawn('git', { stdio: 'pipe'   }, 'arg1', 'arg2', 'arg3')
exports = module.exports = function qspawn(cmd, opts = {}, ...args) {
  if (!_.isPlainObject(opts)) {
    args.unshift(opts);
    opts = {};
  }
  opts.stdio = (opts.stdio === undefined) ? 'inherit' : opts.stdio;
  opts.echoCommand = (opts.echoCommand === undefined) ? true : opts.echoCommand;
  args = _.flatten(args);

  if (opts.echoCommand) {
    console.info('[Spawning]:', cmd, args);
  }

  return Q.Promise(function(resolve, reject) {
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
