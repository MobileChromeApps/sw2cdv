'use strict';

/******************************************************************************/

let Q = require('q');
let minimist = require('minimist');
let fs = require('fs');
let path = require('path');

/******************************************************************************/

let commands = {};

/******************************************************************************/

commands.create = (args) => {
    let www = './';
    if (args._[2]) {
        www = args._[2];
    } else if (fs.existsSync('app')) {
        www = './app';
    }

    let target = args._[1];
    let create = require('./create');

    if (!target || !(target in create))
        return Q.reject('Not a valid target');

    return create[target]({
        www: path.resolve(www),
        root: path.resolve('.', 'sw2cdv_output'),
    });
};

/******************************************************************************/

commands.build = (args) => {
    let www = './';
    if (args._[2]) {
        www = args._[2];
    } else if (fs.existsSync('app')) {
        www = './app';
    }

    let target = args._[1];
    let build = require('./build');

    if (!target || !(target in build))
        return Q.reject('Not a valid target');

    return build[target]({
        www: path.resolve(www),
        root: path.resolve('.', 'sw2cdv_output'),
    });
};

/******************************************************************************/

commands.run = (args) => {
    let www = './';
    if (args._[2]) {
        www = args._[2];
    } else if (fs.existsSync('app')) {
        www = './app';
    }

    let target = args._[1];
    let run = require('./run');

    if (!target || !(target in run))
        return Q.reject('Not a valid target');

    return run[target]({
        www: path.resolve(www),
        root: path.resolve('.', 'sw2cdv_output'),
    });
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
