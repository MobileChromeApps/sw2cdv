'use strict';

/******************************************************************************/

var path = require('path');

// This should be eventaually replaced with
// var IosProject = require('cordova-ios');
var cordovaLib = require('cordova-lib');
var IosProject = cordovaLib.IosProject;

/******************************************************************************/

exports = module.exports = function build(prjInfo) {
    // Requires: prjInfo.paths.www

    let proj = new IosProject();
    return proj.build(prjInfo);
}

/******************************************************************************/
