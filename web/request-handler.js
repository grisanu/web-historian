var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  console.log('REQUEST URL', req.url);
  if ( req.url === '/' ) {
    var asset = '/index.html';
    httpHelpers.serveAssets(res, asset);
  } else {
    var asset = req.url;
    httpHelpers.serveAssets(res, asset);
  }
  // res.end(archive.paths.list);
};
