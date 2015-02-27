'use strict';

/******************************************************************************/

exports = module.exports = function create(prjInfo) {
    // Todo, should be in node_modules
    var sWpluginDirs = [
        path.join(__dirname, '../../PromisesPlugin'),
        path.join(__dirname, '../../cordova-plugin-serviceworker'),
    ];

    prjInfo.paths.plugins = (prjInfo.paths.plugins || []).concat(sWpluginDirs);

    // Should be unnecessary when IosProject lives in cordova-ios
    prjInfo.paths.template = path.join(__dirname, '../node_modules/cordova-ios');

    if (!prjInfo.cfg) {
        var cfg = prjInfo.cfg = new cordovaLib.ConfigParser(path.join(__dirname, '..', 'assets', 'defaultConfig.xml'));
        cfg.setName(prjInfo.appName || 'DefaultSwApp');
        cfg.setPackageName(prjInfo.appId || 'io.cordova.default.sw.app');
        // TODO: Change sw.js <preference>, add this functionality to ConfigParser
        // cfg.setGlobalPreference(name="service_worker" value = prjInfo.swFile || "sw.js")
    }

    var proj = new IosProject();
    return proj.create(prjInfo)
};

/******************************************************************************/
