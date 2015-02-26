'use strict';

/******************************************************************************/

let Q = require('q');
let path = require('path');
let fs = require('fs');
let co = require('co');

/******************************************************************************/

exports.chrome = function runChrome(root) {
  let httpServer = require('http-server');
  let portfinder = require('portfinder');
  let openInChrome = require('./util/open-in-chrome');

  const basePort = 8080;
  const host = 'localhost';

  let server = httpServer.createServer({
    root: root,
    cache: -1,
    logFn: (request) => {
      console.log(`[${new Date}] ${request.method} ${request.url}`); // also: request.headers
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    // Note: Apparently you can load a SW from localhost (but not 0.0.0.0 or 127.0.0.1) domain without SSL
    /*
    https: {
      cert: path.join(__dirname, '..', 'assets', 'certs', 'cert.pem'),
      key: path.join(__dirname, '..', 'assets', 'certs', 'key.pem'),
    },
    */
  });

  portfinder.basePort = basePort;

  return co(function*() {
    let port = yield Q.ninvoke(portfinder, "getPort");
    yield Q.ninvoke(server, "listen", port, host);
    yield openInChrome(`http://${host}:${port}`);
    // Right now, we cannot know when the page has finished loading
    // server.close();
  });
}

/******************************************************************************/

exports.android = function runAndroid(root) {
  return Q.reject('Not implemented');
};

/******************************************************************************/

exports.ios = function runIos(root) {
  return Q.reject('Not implemented');
};

/******************************************************************************/
