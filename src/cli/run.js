'use strict';

/******************************************************************************/

let Q = require('q');
let path = require('path');

/******************************************************************************/

exports = module.exports = function run() {
  let scope = {};

  let httpServer = require('http-server');
  let portfinder = require('portfinder');
  let openInChrome = require('../util/open-in-chrome');

  const basePort = 8080;
  const host = '0.0.0.0';

  let server = httpServer.createServer({
    root: './',
    cache: -1,
    logFn: (request) => {
      console.log(`[${new Date}] ${request.method} ${request.url}`); // also: request.headers
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    https: {
      cert: path.join(__dirname, '..', '..', 'assets', 'certs', 'cert.pem'),
      key: path.join(__dirname, '..', '..', 'assets', 'certs', 'key.pem'),
    },
  });

  portfinder.basePort = basePort;

  return Q.when()
    .then(() => {
      return Q.ninvoke(portfinder, "getPort");
    })
    .then((port) => {
      scope.port = port;
      return Q.ninvoke(server, "listen", port, host);
    })
    .then(() => {
      // Note: there is an npm package called `opener` which may be useful here
      return openInChrome(`https://${host}:${scope.port}`);
    })
    .then(() => {
      // Right now, we cannot know when the page has finished loading
      // server.close();
    });
};

/******************************************************************************/


