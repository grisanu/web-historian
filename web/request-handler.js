var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  // console.log('REQUEST URL', req.url);
  if ( req.url === '/' ) {
    var asset = '/index.html';
    httpHelpers.serveAssets(res, asset, req.method);
  } else if ( req.url.includes('www') ) {
    var asset = req.url;
    // remove the starting /
    // console.log('asset is: ', asset);

    archive.isUrlArchived(asset, function(archiveExists) {
      if ( archiveExists ) { // if in archive
      // return page
        asset = asset.slice(1);
        httpHelpers.serveAssets(res, asset, req.method);
        
      } else { // else not in archive
        // return loading
        asset = 'loading.html';
        httpHelpers.serveAssets(res, asset, req.method);
      }
    });

    archive.isUrlInList(asset, function(urlExists) {
      console.log('url Exists ', urlExists);
      if ( !urlExists ) { // if in list
        console.log('URL does not EXISTS!');
      //  add url to list then return loading
        var asset = req.url;
        asset = asset.slice(1);
        archive.addUrlToList(asset, function () {} );
      } 
      // asset = 'loading.html';
      // httpHelpers.serveAssets(res, asset, req.method);
    });


  } else if ( req.url === '/styles.css' ) {
    var asset = req.url;
    httpHelpers.serveAssets(res, asset, req.method);
  } else {
    res.writeHead(404);
    res.end('Page does not Exist');
  }
  // res.end(archive.paths.list);
};
