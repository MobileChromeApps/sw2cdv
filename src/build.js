'use strict';
var path = require('path');


// This should be eventaually replaced with
// var IosProject = require('cordova-ios');
var cordovaLib = require('cordova-lib');
var IosProject = cordovaLib.IosProject;

/******************************************************************************/

exports = module.exports = build;
function build(prjInfo) {

    // Todo, should be in node_modules
    var sWpluginDirs = [
        path.resolve('../PromisesPlugin'),
        path.resolve('../cordova-plugin-serviceworker'),
    ];

    prjInfo.paths.plugins = (prjInfo.paths.plugins || []).concat(sWpluginDirs);

    // Should be unnecessary when IosProject lives in cordova-ios
    prjInfo.paths.template = path.resolve('./node_modules/cordova-ios');

    if (!prjInfo.cfg) {
        var cfg = prjInfo.cfg = new cordovaLib.ConfigParser(path.resolve('./src/defaultConfig.xml'));
        cfg.setName(prjInfo.appName || 'DefaultSwApp');
        cfg.setPackageName(prjInfo.appId || 'io.cordova.default.sw.app');
        // TODO: Change sw.js <preference>, add this functionality to ConfigParser
        // cfg.setGlobalPreference(name="service_worker" value = prjInfo.swFile || "sw.js")
    }

    var proj = new IosProject();

    return proj.create(prjInfo);
}

/******************************************************************************/
