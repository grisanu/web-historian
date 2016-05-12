var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.serveAssets = function(res, asset, reqMethod, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var filePath = archive.paths.siteAssets + asset;
  if ( asset.includes('.com') ) {
    filePath = archive.paths.archivedSites + '/' + asset;
  }
  fs.readFile(filePath, function(err, data) {
    var statusCode = 200;
    if ( reqMethod === 'POST' ) {
      statusCode = 302;
      var responseBody = {
        body: data
      };
      // data = JSON.stringify(responseBody);
    }
    callback(statusCode, filePath, data, res);
  });
};

// As you progress, keep thinking about what helper functions you can put here!
exports.sendRes = function(statusCode, filePath, data, res) {
  var contentType = '';
  var ext = path.extname(filePath);
  switch (ext) {
  case '.com':
  case '.html':
    exports.headers['Content-Type'] = 'text/html';
    break;
  case '.js':
    exports.headers['Content-Type'] = 'text/javascript';
    break;
  case '.css':
    exports.headers['Content-Type'] = 'text/css';
    break;
  case '.gif':
    exports.headers['Content-Type'] = 'image/gif';
    break;
  case '.png':
    exports.headers['Content-Type'] = 'image/png';
    break;
  }
  // write header
  res.writeHead(statusCode, exports.headers);
  // end response
  res.end(data);
};



