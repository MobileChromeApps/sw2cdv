'use strict';

/******************************************************************************/

let path = require('path');
let pp = require('CordovaPlatformProject');
let shelljs = require('shelljs');

/******************************************************************************/

function fixPrjInfo(prjInfo) {
    prjInfo = prjInfo || {};
    prjInfo.paths = prjInfo.paths || {};
    prjInfo.paths.template = prjInfo.paths.template || prjInfo.template || prjInfo.platform;
    prjInfo.paths.plugins = prjInfo.paths.plugins || prjInfo.plugins || [];
    prjInfo.paths.www = prjInfo.paths.www || prjInfo.www || prjInfo.src;
    prjInfo.paths.root = prjInfo.paths.root || prjInfo.root || prjInfo.dest;
    prjInfo.paths.icons = prjInfo.paths.icons || prjInfo.paths.www; // TODO: do we need this?

    let manifest;
    try {
      manifest = require(path.join(prjInfo.paths.www, 'manifest.json'));
    } catch (e) {
      manifest = {
        name: 'DefaultSwApp',
        service_worker: 'service-worker.js'
      };
    }
    manifest.app_id = manifest.app_id || 'io.cordova.DefaultSwApp';
    manifest.icons = manifest.icons || [];

    if (!prjInfo.cfg) {
        let cfg = prjInfo.cfg = new pp.cdv.ConfigParser(path.join(__dirname, '..', 'assets', 'defaultConfig.xml'));

        cfg.setName(manifest.name);
        cfg.setPackageName(manifest.app_id);
        cfg.setGlobalPreference('ServiceWorker', manifest.service_worker);

        manifest.icons.forEach(function(icon) {
            // TODO: figure out what to do with icon sizes.
            cfg.addElement('icon', {src: icon.src});
        });
    }

    shelljs.mkdir('-p', path.dirname(prjInfo.paths.root));

    return prjInfo;
}

/******************************************************************************/

function createIos(prjInfo) {
    prjInfo = fixPrjInfo(prjInfo);
    prjInfo.platform = 'ios';

    let sWpluginDirs = [
        path.join(__dirname, '../deps/PromisesPlugin'), // TODO: should be in node_modules
        path.join(__dirname, '../node_modules/cordova-plugin-service-worker'),
    ];
    prjInfo.paths.plugins = prjInfo.paths.plugins.concat(sWpluginDirs);

    prjInfo.paths.template = prjInfo.paths.template || path.join(__dirname, '../node_modules/cordova-ios');
    //prjInfo.configPath = path.join(prjInfo.paths.root, prjInfo.cfg.name(), 'config.xml');

    let proj = new pp.PlatformProject();
    return proj.create(prjInfo);
}

/******************************************************************************/

function createAndroid(prjInfo) {
    prjInfo = fixPrjInfo(prjInfo);
    prjInfo.platform = 'android';

    prjInfo.paths.template = prjInfo.paths.template || path.join(__dirname, '../node_modules/cordova-android');
    //prjInfo.configPath = path.join(prjInfo.paths.root, 'res', 'xml', 'config.xml');

    let proj = new pp.PlatformProject();
    return proj.create(prjInfo);
}

/******************************************************************************/

module.exports.ios = createIos;
module.exports.android = createAndroid;
