var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var sendRes = httpHelpers.sendRes;

exports.handleRequest = function (req, res) {
  if ( req.method === 'GET' ) {
    if ( req.url === '/' || req.url === '/index.html' ) {
      var asset = '/index.html';
      httpHelpers.serveAssets(res, asset, req.method, sendRes);
    } else if ( req.url === '/styles.css' || req.url === '/app.js' ) {
      var asset = req.url;
      httpHelpers.serveAssets(res, asset, req.method, sendRes);
    } else {
      res.writeHead(404);
      res.end('Page does not Exist');
    }
  } else if ( req.method === 'POST' ) {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function () {
      var asset = body.slice(4);
      if ( body.includes('www') ) {
        asset = asset.slice(4);
      }
      // Async Promise Func
      // archive.isUrlArchivedAsync(asset)
      //   .then(function(archiveExists) {
      //     console.log('this is in the is archive condition');
      //     if (archiveExists) {
      //       console.log('it thinks its in the archive')
      //       httpHelpers.serveAssets(res, asset, req.method, sendRes);
      //     }
      //   });

      // archive.isUrlArchived(asset, function(archiveExists) {
      //   if ( archiveExists ) { // if in archive
      //   // return page
      //     httpHelpers.serveAssets(res, asset, req.method, sendRes);
      //   }
      // });

      // archive.isUrlInListAsync(asset)
      //   .then(function(urlExists) {
      //     if (!urlExists) {
      //       console.log('url was not in the list');
      //       archive.addUrlToList(asset, function () {} );
      //       httpHelpers.serveAssets(res, '/loading.html', req.method, sendRes);
      //     }
      //   });

      archive.isUrlArchived(asset, function(err, archiveExists) {
        if ( archiveExists ) { // if in archive
        // return page
          httpHelpers.serveAssets(res, asset, req.method, sendRes);
        }
      });

      archive.isUrlInList(asset, function(urlExists) {
        if ( !urlExists ) { // if in list
          archive.addUrlToList(asset, function () {} );
          httpHelpers.serveAssets(res, '/loading.html', req.method, sendRes);
        } 
      });

    });

  }
};
