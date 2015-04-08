'use strict';

/******************************************************************************/

let path = require('path');
// let cordovaLib = require('cordova-lib');
let pp = require('CordovaPlatformProject');

/******************************************************************************/

function fixPrjInfo(prjInfo) {
    prjInfo = prjInfo || {};
    prjInfo.paths = prjInfo.paths || {};
    prjInfo.paths.plugins = (prjInfo.paths.plugins || []);
    prjInfo.paths.www = prjInfo.paths.www || prjInfo.www;
    prjInfo.paths.root = prjInfo.paths.root || prjInfo.root;
    prjInfo.paths.icons = prjInfo.paths.icons || prjInfo.paths.www;

    let manifest;
    try {
      manifest = require(path.join(prjInfo.paths.www, 'manifest.json'));
    } catch (e) {
      manifest = {
        name: 'DefaultSwApp',
        service_worker: 'service-worker.js'
      };
    }

    prjInfo.service_worker = manifest.service_worker || 'service-worker.js';

    if (!prjInfo.cfg) {
        let cfg = prjInfo.cfg = new pp.cdv.ConfigParser(path.join(__dirname, '..', 'assets', 'defaultConfig.xml'));
        cfg.setName(manifest.name);
        cfg.setPackageName(manifest.app_id || 'io.cordova.DefaultSwApp');
        cfg.setGlobalPreference('serviceworker', manifest.service_worker);
        // TODO: figure out what to do with icon sizes.
        if (manifest.icons) {
            manifest.icons.forEach(function(icon) {
                cfg.addElement('icon', {src: icon.src});
            });
        }
    }
    return prjInfo;
}

/******************************************************************************/

function createIos(prjInfo) {
    prjInfo = fixPrjInfo(prjInfo);
    prjInfo.platform = 'ios';

    // Todo, should be in node_modules
    let sWpluginDirs = [
        path.join(__dirname, '../deps/PromisesPlugin'),
        path.join(__dirname, '../deps/cordova-plugin-serviceworker'),
    ];

    prjInfo.paths.plugins = prjInfo.paths.plugins.concat(sWpluginDirs);

    // Should be unnecessary when IosProject lives in cordova-ios
    prjInfo.paths.template = path.join(__dirname, '../node_modules/cordova-ios');
    prjInfo.configPath = path.join(prjInfo.paths.root, prjInfo.cfg.name(), 'config.xml');

    let proj = new pp.PlatformProject();
    return proj.create(prjInfo);
}

/******************************************************************************/

function createAndroid(prjInfo) {
    prjInfo = fixPrjInfo(prjInfo);
    prjInfo.platform = 'android';
    prjInfo.paths.template = path.join(__dirname, '../node_modules/cordova-android');

    let proj = new pp.PlatformProject();
    return proj.create(prjInfo);
}

/******************************************************************************/

module.exports.ios = createIos;
module.exports.android = createAndroid;
