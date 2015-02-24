'use strict';

/******************************************************************************/

let Q = require('q');
let minimist = require('minimist');

/******************************************************************************/

exports = module.exports = () => {
  let targets = {
    run: () => {
      return require('./cli/run')(argv);
    },
  };

  let argv = minimist(process.argv.slice(2));
  let target = argv._[0];

  if (!(target in targets)) {
    // TODO: Usage
    return Q.reject('No valid command');
  }

  return targets[target]();
};

/******************************************************************************/
