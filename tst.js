#!/usr/bin/env node

// TMP: Legacy logging plumbing (to be removed)
var cordovaLib = require('cordova-lib');
cordovaLib.events.on('log', console.log);
cordovaLib.events.on('error', console.error);
cordovaLib.events.on('warn', console.warn);
cordovaLib.events.on('verbose', console.log);


// The real code as should be seen in Gulpfile

var sw2cdv = require('./main');
var path = require('path');
var shell = require('shelljs');
//var build = require('./src/build');

var prjInfo = {
    paths: {
        www: path.resolve('tests/gulp/app'),
        root: path.resolve('./build'),
        swFile: 'sw.js',
    },
    appName: 'HelloSwApp'
};

shell.rm('-rf', prjInfo.paths.root);
sw2cdv.build(prjInfo).done();
