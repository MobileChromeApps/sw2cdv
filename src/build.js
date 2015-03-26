'use strict';

/******************************************************************************/

// This should be eventaually replaced with
// let IosProject = require('cordova-ios');
// let cordovaLib = require('cordova-lib');
let pp = require('CordovaPlatformProject');

/******************************************************************************/

function buildIos(prjInfo) {
    if (typeof prjInfo === 'string') {
      prjInfo = {
        root: prjInfo
      };
    }

    let proj = new pp.PlatformProject();
    return proj.open('ios', prjInfo.root)
        .then(() => {
            return proj.build();
        });
}

/******************************************************************************/

function buildAndroid(prjInfo) {
    if (typeof prjInfo === 'string') {
        prjInfo = {
            root: prjInfo
        };
    }
    let proj = new pp.PlatformProject();
    return proj.open('android', prjInfo.root)
        .then(() => {
            return proj.build();
        });
}

/******************************************************************************/

module.exports.ios = buildIos;
module.exports.android = buildAndroid;
