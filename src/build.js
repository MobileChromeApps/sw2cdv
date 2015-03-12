'use strict';

/******************************************************************************/

// This should be eventaually replaced with
// let IosProject = require('cordova-ios');
let cordovaLib = require('cordova-lib');

/******************************************************************************/

function buildIos(prjInfo) {
    if (typeof prjInfo === 'string') {
      prjInfo = {
        root: prjInfo
      };
    }
    let IosProject = cordovaLib.IosProject;
    let proj = new IosProject();
    return proj.open(prjInfo.root)
        .then(() => {
            return proj.build();
        });
};

/******************************************************************************/

function buildAndroid(prjInfo) {
    if (typeof prjInfo === 'string') {
        prjInfo = {
            root: prjInfo
        };
    }
    let AndroidProject = cordovaLib.AndroidProject;
    let proj = new AndroidProject();
    return proj.open(prjInfo.root)
        .then(() => {
            return proj.build();
        });
};

/******************************************************************************/

module.exports.ios = buildIos;
module.exports.android = buildAndroid;
