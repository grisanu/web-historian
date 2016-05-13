var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var Promise = require('bluebird');

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
    if (err) {
      cb(err); // reject has error then body (or nothing)
    } else {
      cb(err, data.split('\n')); // resolve must have result as 2nd param
    }
  });
};

exports.readListOfUrlsAsync = Promise.promisify(exports.readListOfUrls);

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(list) {
    cb(_.contains(list, url));
  });
};

exports.isUrlInListAsync = function (url) {
  return exports.readListOfUrlsAsync()
    .then(function(list) {
      return _.contains(list, url);
    });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, (url + '\n'), function(err) {
    if (err) {
      cb(err);
    } else {
      cb();
    }
  });
};

exports.addUrlToListAsync = Promise.promisify(exports.addUrlToList);

exports.isUrlArchived = function(url, cb) {
  // check if a file exists in a folder
  var urlPath = exports.paths.archivedSites + '/' + url;
  fs.readFile(urlPath, 'utf8', function(err, data) {
    if (err) {
      cb(err, false);
    } else {
      cb(err, true);
    }
  });
};

exports.isUrlArchivedAsync = Promise.promisify(exports.isUrlArchived);

var makeHttpReq = function (url) {
  var options = {
    hostname: url, 
    path: '/'
  };
  var body = '';
  var req = http.request(options, function(res) {
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var urlPath = exports.paths.archivedSites + '/' + url;
      fs.writeFile(urlPath, body);    
    });
  });
  req.end();
};

exports.downloadUrls = function(urlArray) {
  // loop through urlArray
    // append to a file, if it doesnt exist it will create it
  for (var urlIndex = 0; urlIndex < urlArray.length - 1; urlIndex++) {
    // use callback pattern to get the right url
    makeHttpReq(urlArray[urlIndex]);
  }
};








