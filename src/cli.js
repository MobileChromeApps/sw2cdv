'use strict';

/******************************************************************************/

let Q = require('q');
let minimist = require('minimist');

/******************************************************************************/

let commands = {};

/******************************************************************************/

commands.run = (args) => {
  if (args._[1] === 'chrome') {
    let root = './';
    if (args._[2]) {
      root = args._[2];
    } else if (fs.existsSync('app')) {
      root = './app';
    }
    return require('./run').chrome();
  }

  return Q.reject('Not a valid target');
};

/******************************************************************************/

exports = module.exports = () => {
  let args = minimist(process.argv.slice(2));
  let command = args._[0];

  if (!(command in commands)) {
    // TODO: Usage
    return Q.reject('No valid command');
  }

  return commands[command](args);
};

/******************************************************************************/
