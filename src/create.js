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

    prjInfo.paths = prjInfo.paths || {};
    prjInfo.paths.plugins = (prjInfo.paths.plugins || []).concat(sWpluginDirs);
    prjInfo.paths.www = prjInfo.paths.www || prjInfo.www;
    prjInfo.paths.root = prjInfo.paths.root || prjInfo.root;

    let manifest;
    try {
      manifest = require(path.join(prjInfo.paths.www, 'manifest.json'));
    } catch (e) {
      manifest = {
        name: 'DefaultSwApp',
        service_worker: 'service-worker.js'
      };
    }
    manifest.service_worker = manifest.service_worker || 'service-worker.js';

    // Should be unnecessary when IosProject lives in cordova-ios
    prjInfo.paths.template = path.join(__dirname, '../node_modules/cordova-ios');

    if (!prjInfo.cfg) {
        let cfg = prjInfo.cfg = new cordovaLib.ConfigParser(path.join(__dirname, '..', 'assets', 'defaultConfig.xml'));
        cfg.setName(manifest.name);
        cfg.setPackageName(manifest.app_id || 'io.cordova.default.sw.app');
        // TODO: Change sw.js <preference>, add this functionality to ConfigParser
        // cfg.setGlobalPreference(name="service_worker" value = manifest.service_worker)
    }

    let IosProject = cordovaLib.IosProject;
    let proj = new IosProject();
    return proj.create(prjInfo)
      .then(() => {
        let et = require('elementtree');
        let fs = require('fs');
        let configXml = fs.readFileSync(path.join(prjInfo.paths.root, prjInfo.cfg.name(), 'config.xml')).toString();
        let xml = et.parse(configXml);
        xml.find('preference[@name="service_worker"]').attrib.value = manifest.service_worker;
        let output = xml.write({'xml_declaration': false})
        fs.writeFileSync(path.join(prjInfo.paths.root, prjInfo.cfg.name(), 'config.xml'), output);
      });
};

/******************************************************************************/

function createAndroid(prjInfo) {
    return Q.reject('Not implemented');
}

/******************************************************************************/

module.exports.ios = createIos;
module.exports.android = createAndroid;
