'use strict';

/******************************************************************************/

/******************************************************************************/

module.exports = exports = function openInChrome(uri, canary = true) {
  let pSpawn = require('./pSpawn');

  let chromeExe = 'Chrome' + (canary ? ' Canary' : '');
  let chromeArgs = [
      '--user-data-dir=/tmp/OpenInChromeProfile', // TODO: Canary only?
      uri
    ];

  if (process.platform === 'win32') {
    return pSpawn('cmd', ['/s', '/c', 'start', chromeExe].concat(chromeArgs));
  } else if (process.platform === 'darwin') {
    chromeExe = 'Google ' + chromeExe;
    return pSpawn('open', ['-n', '-a', chromeExe, '--args'].concat(chromeArgs));
  }
};
