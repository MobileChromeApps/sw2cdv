'use strict';

/******************************************************************************/

// This should be eventaually replaced with
// let IosProject = require('cordova-ios');
let cordovaLib = require('cordova-lib');

/******************************************************************************/

function buildIos(root) {
    let IosProject = cordovaLib.IosProject;
    let proj = new IosProject();
    return proj.open(root)
        .then(() => {
            return proj.build();
        });
};

/******************************************************************************/

function buildAndroid(root) {
  return Q.reject('Not implemented');
};

/******************************************************************************/

module.exports.ios = buildIos;
module.exports.android = buildAndroid;
