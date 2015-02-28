'use strict';

/******************************************************************************/

let child_process = require('child_process');
let _ = require('lodash');
let co = require('co');
let Q = require('q');

/******************************************************************************/

// Usage:
// pRun('git', ['arg1', 'arg2', 'arg3'])
// pRun('git', 'arg1', 'arg2', 'arg3')
// pRun('git', 'arg1 arg2 arg3')
// pRun('git', { silent: false }, ['arg1', 'arg2', 'arg3'])
// pRun('git', { silent: false }, 'arg1', 'arg2', 'arg3')
// pRun('git', { silent: false }, 'arg1 arg2 arg3')
exports = module.exports = function pRun(cmd, opts = {}, ...args) {
  if (!_.isPlainObject(opts)) {
    args.unshift(opts);
    opts = {};
  }
  opts.silent = (opts.silent === undefined) ? true : opts.silent;
  opts.echoCommand = (opts.echoCommand === undefined) ? false : opts.echoCommand;

  let command = `${cmd} ${_.flatten(args).join(' ')}`;

  if (opts.echoCommand) {
    console.info('[Running]:', command);
  }

  return co(function*() {
    let [stdout, stderr] = yield Q.nfcall(child_process.exec, command);
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim()
    };
  });
};
