var archive = require('../helpers/archive-helpers');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// read the list
exports.updateArchives = function() {
  archive.readListOfUrls( function(listArray) {
    archive.downloadUrls(listArray);
  });
};
