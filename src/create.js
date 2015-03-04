'use strict';

/******************************************************************************/

let path = require('path');
let cordovaLib = require('cordova-lib');

/******************************************************************************/

function createIos(prjInfo) {
    // Todo, should be in node_modules
    let sWpluginDirs = [
        path.join(__dirname, '../../PromisesPlugin'),
        path.join(__dirname, '../../cordova-plugin-serviceworker'),
    ];

    prjInfo.paths.plugins = (prjInfo.paths.plugins || []).concat(sWpluginDirs);

    // Should be unnecessary when IosProject lives in cordova-ios
    prjInfo.paths.template = path.join(__dirname, '../node_modules/cordova-ios');

    if (!prjInfo.cfg) {
        let cfg = prjInfo.cfg = new cordovaLib.ConfigParser(path.join(__dirname, '..', 'assets', 'defaultConfig.xml'));
        cfg.setName(prjInfo.appName || 'DefaultSwApp');
        cfg.setPackageName(prjInfo.appId || 'io.cordova.default.sw.app');
        // TODO: Change sw.js <preference>, add this functionality to ConfigParser
        // cfg.setGlobalPreference(name="service_worker" value = prjInfo.swFile || "sw.js")
    }

    let IosProject = cordovaLib.IosProject;
    let proj = new IosProject();
    return proj.create(prjInfo)
};

/******************************************************************************/

function createAndroid(prjInfo) {
    return Q.reject('Not implemented');
}

/******************************************************************************/

module.exports.ios = createIos;
module.exports.android = createAndroid;
