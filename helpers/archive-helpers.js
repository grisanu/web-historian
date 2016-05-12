var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    cb(data.split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  // if ( url.includes('www') ) {
  //   url = url.slice(4);
  // }
  exports.readListOfUrls(function(list) {
    cb(_.contains(list, url));
  });
};

exports.addUrlToList = function(url, cb) {
  // if ( url.includes('www') ) {
  //   url = url.slice(4);
  // }
  fs.appendFile(exports.paths.list, url, function(err) {
    cb();
  });
};

exports.isUrlArchived = function(url, cb) {
  // check if a file exists in a folder
  var urlPath = exports.paths.archivedSites + url;
  fs.readFile(urlPath, 'utf8', function(err, data) {
    if (err) {
      cb(false);
    } else {
      cb(true);
    }
  });
};

exports.downloadUrls = function(urlArray) {
  // loop through urlArray
    // append to a file, if it doesnt exist it will create it
  for (var urlIndex = 0; urlIndex < urlArray.length; urlIndex++) {
    // use callback pattern to get the right url
    (function (url) {
      var urlPath = exports.paths.archivedSites + '/' + url;
      fs.appendFile(urlPath, url);
    })(urlArray[urlIndex]);
  }
};







